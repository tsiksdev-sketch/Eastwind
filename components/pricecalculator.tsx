'use client';

import { useState, useMemo } from "react";
import { Calculator, ArrowRight, Ruler, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PRICE_PER_SQM = 30;
const MIN = 300;
const MAX = 800;

interface Props {
  trigger?: React.ReactNode;
}

export function PriceCalculator({ trigger }: Props) {
  const [size, setSize] = useState<number>(500);
  const [plan, setPlan] = useState<6 | 12 | 18>(12);

  const clamped = Math.min(MAX, Math.max(MIN, Number.isFinite(size) ? size : MIN));
  const total = useMemo(() => clamped * PRICE_PER_SQM, [clamped]);
  const deposit = total * 0.5;
  const balance = total - deposit;
  const monthly = balance / plan;

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="lg" className="rounded-full gap-2">
            <Calculator className="h-4 w-4" /> Price Calculator
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl mx-auto p-0 overflow-hidden border-0 rounded-3xl">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-8">
          <DialogHeader className="text-left space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-foreground/80">
              <Calculator className="h-3.5 w-3.5" /> Instant Estimate
            </div>
            <DialogTitle className="text-3xl md:text-4xl font-display font-semibold">
              Price Calculator
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/80">
              $30 per m² · Stand sizes from 300 to 800 m²
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-8 bg-background">
          {/* Size input */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Ruler className="h-4 w-4 text-primary" /> Stand size
              </label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  min={MIN}
                  max={MAX}
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value) || 0)}
                  className="w-24 text-right font-semibold"
                />
                <span className="text-sm text-muted-foreground">m²</span>
              </div>
            </div>
            <Slider
              value={[clamped]}
              min={MIN}
              max={MAX}
              step={10}
              onValueChange={(v) => setSize(v[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{MIN} m²</span>
              <span>{MAX} m²</span>
            </div>
          </div>

          {/* Plan */}
          <div>
            <label className="text-sm font-medium mb-3 block">Payment plan</label>
            <div className="grid grid-cols-3 gap-2">
              {[6, 12, 18].map((m) => (
                <button
                  key={m}
                  onClick={() => setPlan(m as 6 | 12 | 18)}
                  className={`rounded-xl border py-3 text-sm font-semibold transition ${
                    plan === m
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border hover:border-primary/40"
                  }`}
                >
                  {m} months
                </button>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="rounded-2xl bg-secondary/60 border border-border p-6">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">Total price</span>
              <span className="text-4xl font-display font-semibold text-primary flex items-center">
                <DollarSign className="h-6 w-6" />
                {total.toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Deposit (50%)</p>
                <p className="text-lg font-semibold mt-1">{fmt(deposit)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Balance</p>
                <p className="text-lg font-semibold mt-1">{fmt(balance)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Per month</p>
                <p className="text-lg font-semibold mt-1 text-primary">{fmt(monthly)}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Estimate only. Excludes standard cession/transfer fees.
          </p>

          <Button asChild size="lg" className="w-full rounded-full">
            <Link href="/contact">
              Reserve This Stand <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
