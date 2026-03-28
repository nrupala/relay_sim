# 🚀 RelaySim v4.0: Upcoming Features & Roadmap

This document outlines the next phase of development for the **IEEE C37 / GE Art & Science** Relay Simulator. The focus of v4.0 is transitioning from a current-only simulator to a full **Multivariable Environmental Lab**.

## 1. Advanced Physics Engine (V4.0 Core)
*   **Symmetrical Component Expansion**: Full calculation and visualization of Positive ($I_1$), Negative ($I_2$), and Zero ($I_0$) sequence phasors to teach the "invisible" triggers for ANSI 46 and 50G.
*   **Impedance (Mho) Calculation**: Implementing $Z = V / I$ math to drive the **ANSI 21 (Distance)** relay, allowing students to see how voltage dips affect protection reach.
*   **V/Hz Logic**: Finalizing the ratio-based tripping for **ANSI 24 (Overexcitation)**, linking system frequency ($f$) to transformer magnetic flux saturation.

## 2. The "Sensor" Console (New Sliders)
We are moving beyond current sliders to include environmental and mechanical variables:
*   **System Voltage & Frequency**: Global sliders to simulate brownouts and over-frequency events.
*   **Mechanical Sensors**: 
    *   **Transformer Tank Pressure**: For simulating the **ANSI 63 (Buchholz)** sudden pressure relay.
    *   **Winding Temperature**: To drive the **ANSI 49 (Thermal)** curve and teach ambient-temperature derating.
*   **Power Factor & Directionality**: Introducing phase-angle controls for **ANSI 67 (Directional Overcurrent)** studies.

## 3. Specialized Study Modules
*   **Motor Starting Study**: 
    *   **"Start" Button Simulation**: Triggers a 6x FLA current spike for a defined acceleration time.
    *   **Inrush vs. Fault**: Teaching students how to set the **ANSI 50** above inrush while keeping **ANSI 51** close for thermal protection.
*   **CT Saturation Lab**: 
    *   Modeling the "Knee Point" of Current Transformers.
    *   Visualizing phasor "clipping" and secondary current loss during high-magnitude faults.

## 4. Visual & UI Enhancements
*   **TCC Plotter (Log-Log)**: A real-time Time-Current Characteristic graph that overlays the Relay Curve with the Equipment Damage Curve.
*   **Sequence of Events (SOE) Log**: A scrollable history at the bottom of the screen recording:
    *   `[T+0.000s] Fault Detected`
    *   `[T+0.015s] ANSI 51 Timer Started`
    *   `[T+0.450s] Breaker Trip Command Sent`
*   **Reset & Targets**: Manual "Target Reset" requirement after a trip, mimicking real-life substation operations.

---
**Reference:** Based on *IEEE 242 (Buff Book)* and *GE: The Art and Science of Protective Relaying*.
