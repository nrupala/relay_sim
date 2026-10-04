# relay_sim — Relay Fault Simulation Engine

An interactive training simulator for protective relaying: power-system faults and how protection relays respond. Built for learning and intuition — motor, transformer, busbar, and transmission-line equipment models with ANSI relay functions you can fault, watch, and trip.

## What it does

- **12 ANSI device functions** — 50/51/50G overcurrent, 46 phase unbalance, 49 thermal, 66 starts-per-hour, 87T/87B differential, 24 volts-per-hertz, 63 sudden pressure, 21 distance (mho), 67 directional overcurrent. Each ships with a plain-language explanation and the math behind it.
- **4 equipment models** — industrial motor (4.16 kV / 500 HP), power transformer (13.8/4.16 kV), main busbar (13.8 kV), transmission line (115 kV), each wired to the relays that protect it.
- **Real relay math, simplified** — IEEE very-inverse time curves `t = TD · (A/(M^p − 1) + B)`, symmetrical components, V/Hz overexcitation, and impedance-based distance reach, with fixed, disclosed teaching constants.
- **Visual lab** — sequence-phasor display, TCC plotter, power analyzer, trip readout, plus a help section grounded in IEEE 242 and GE's *Art & Science of Protective Relaying*.

## Try it

Live demo: <https://nrupala.github.io/relay_sim/>

## Run it locally

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # typecheck + production build
npm run lint     # eslint
npm run deploy   # build + publish to GitHub Pages
```

## Scope honesty

The engine uses simplified teaching models — fixed pickup and time-dial constants, approximated sequence components. It builds intuition for how relays behave; it is not a protection coordination or settings tool.

## Roadmap

See [`upcoming_features.md`](upcoming_features.md) for the v4.0 plan: a multivariable environmental lab with motor-starting studies, a CT saturation lab, a full log-log TCC plotter, and a sequence-of-events log. Changes are tracked in [`CHANGELOG.md`](CHANGELOG.md) under the [app versioning standard](docs/VERSIONING.md).

## License

AGPL-3.0 — see [LICENSE](LICENSE). If the AGPL's terms don't fit your use
(e.g. embedding in a proprietary product or running it as a hosted service),
commercial licenses are available — see [LICENSE-COMMERCIAL.md](LICENSE-COMMERCIAL.md).
