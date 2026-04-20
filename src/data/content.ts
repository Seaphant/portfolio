export const personal = {
  name: 'William Nguyen',
  title: 'Software Engineering Student',
  subtitle: 'Embedded \u00b7 Firmware \u00b7 Robotics',
  email: 'wdnguyen11@gmail.com',
  phone: '(669) 236-9252',
  location: 'San Jose, CA',
  github: 'https://github.com/Seaphant',
  linkedin: 'https://www.linkedin.com/in/william-nguyen-6046633aa/',
  resume: '/William_Nguyen_Resume.pdf',
  /** Short hero blurb */
  heroIntro:
    "I'm at San Jos\u00e9 State (grad May 2027), currently interning at Avicena Tech on optical interconnect firmware and system integration. Most of what I build lives on STM32 or ESP32: motors, sensors, serial debug, flash layouts, that kind of thing. I like the boring parts too: bring-up, logging, figuring out why the board does something weird at 2am.",
}

export const about = {
  paragraphs: [
    "School is software engineering, but the work I care about is closer to the metal. I spend a lot of nights in CubeIDE, PlatformIO, or a serial terminal, trying to make hardware and firmware agree with each other.",
    "I've shipped three personal embedded projects end to end: a bare-metal UART bootloader (no HAL, no libc), a FreeRTOS sensor hub with CLI + telemetry, and a 3D-printed hand on ESP32 with current sensing and FSRs. None of that was a class handout. I wired it, broke it, fixed it, and wrote down what I measured.",
    "I'm currently at Avicena Tech, working on firmware bring-up, Python host tooling, and GUI development for optical semiconductor characterization.",
  ],
}

export type FocusArea = {
  title: string
  description: string
}

export const focusAreas: FocusArea[] = [
  {
    title: 'Embedded software',
    description:
      'STM32 and ESP32. Register-level bring-up when I need it, HAL/Cube when it saves time. I\u2019ve written my own startup + linker regions for a bootloader split.',
  },
  {
    title: 'Firmware',
    description:
      'Boot flow, flash erase/program, CRC checks, UART protocols, and enough Python on the host side to actually flash and test the thing.',
  },
  {
    title: 'Robotics / mechatronics',
    description:
      'PWM, current sense, simple state machines, homing without encoders, and stopping motors before something smells bad.',
  },
  {
    title: 'Debug',
    description:
      'Logic analyzer, scope when I can get one, serial traces, and logs I can grep later. I\u2019d rather have an ugly printf than a silent failure.',
  },
]

export type Project = {
  id: string
  title: string
  tagline: string
  summary: string
  github: string
  tags: string[]
  focus: string
  highlights: string[]
  challenges: string[]
  whyItMatters: string
  interviewTalkingPoint: string
}

export const projects: Project[] = [
  {
    id: 'yoko',
    title: 'YOKO \u00b7 3D-printed hand',
    tagline:
      'Five fingers on an ESP32. PWM motors, shunt + INA180 for current, FSRs on the tips, homing by stall current. Logged bench data; 18/20 grasps worked on the foam ball tests.',
    summary:
      "Solo project: OpenSCAD for the print, off-the-shelf drivers and motors, firmware in C++ on Arduino/PlatformIO. TB6612FNG H-bridges, 1 kHz LEDC PWM, slew limit so duty doesn't step instantly. Bus current goes through a 0.1 \u03a9 shunt into an INA180 on ADC1. That same reading feeds homing (stall ~800 mA) and a separate safety trip (1.5 A, debounced, latches until I clear it). FSRs are voltage dividers into the ADC; I run an EMA because PWM noise was showing up 200+ counts otherwise. Homing limits land in NVS so I don't redo the whole sequence every boot.",
    github: 'https://github.com/Seaphant/YOKO',
    tags: ['C/C++', 'ESP32', 'PlatformIO', 'PWM', 'ADC', 'OpenSCAD', 'GitHub Actions'],
    focus: 'Mechatronics',
    highlights: [
      'Main loop always hits safety first, then calibration, then sensors, then motors. If current is wrong, nothing else gets to override that.',
      'Two different current thresholds on purpose: homing wants to see the stall early; the fuse-style cutoff has to stay above normal grip current.',
      'EMA on FSRs (\u03b1 = 200) was the compromise after I saw ground bounce from PWM on the ADC.',
      'OpenSCAD model is parametric; I chased joint clearance separately for PLA vs PETG.',
      'CI on GitHub builds the firmware and runs the size report on main.',
    ],
    challenges: [
      'FSRs picked up motor noise, fixed in software (filter tuning), not by pretending the analog front end was perfect.',
      'Printed joints needed a few iterations; PETG vs PLA shrink mattered more than I expected.',
      'Homing backs off after a stall so the finger isn\u2019t stuck loaded against the hard stop.',
    ],
    whyItMatters:
      'It\u2019s the full stack I want to be good at: mechanics, analog, firmware, and test notes that match what the scope actually said.',
    interviewTalkingPoint:
      'Ask me about the current sense path: why two thresholds, how I verified trip time, and what the grasp logs looked like.',
  },
  {
    id: 'bootloader',
    title: 'STM32G474 UART bootloader',
    tagline:
      '64 KB bootloader / 448 KB app, all in C against the reference manual. CRC32 on the image, CRC16 on the wire, VTOR + MSP handoff when the checks pass.',
    summary:
      'Nucleo-G474RE target. Built with -nostdlib -ffreestanding. I wrote the register header glue and startup myself. Flash is split in the linker: bootloader stays low, app + 512-byte header start at 0x0801_0000. On boot I either validate and jump, or sit in a UART command loop. Jump path disables interrupts, nukes SysTick, clears NVIC enables/pending, sets VTOR, DSB/ISB, loads MSP from the app vector table, then branches to Reset_Handler. Python tools patch the header (size + CRC32) and talk the packet protocol.',
    github: 'https://github.com/Seaphant/stm32g474-bootloader',
    tags: ['C', 'Cortex-M4', 'STM32', 'Bare-metal', 'Linker', 'CRC32', 'UART', 'Python', 'OpenOCD'],
    focus: 'Low-level',
    highlights: [
      'No HAL, no CMSIS dependency: just macros, volatiles, and the RM.',
      'Flash erase/write refuses anything that would touch the bootloader pages; app region only.',
      'Image checks: magic, header version, size bounds, CRC32 over code, MSP in SRAM, reset vector thumb bit + range.',
      'UART framing: SOF, cmd, length, payload, CRC16-CCITT both directions.',
      'Double-word program builds 32-bit words from bytes so the compiler doesn\u2019t get to "optimize" me into UB.',
    ],
    challenges: [
      'Ordering around VTOR/MSP mattered, so I leaned on DSB/ISB after reading the ARM app note one too many times.',
      '512-byte header wasn\u2019t random; it pads the vector table to the alignment the G4 wants.',
    ],
    whyItMatters:
      "It's the kind of project where a mistake bricks the board, so I slowed down, read the errata, and tested the jump path a lot.",
    interviewTalkingPoint:
      'I can walk through the jump sequence on a whiteboard: what gets turned off, what gets reloaded, and what I check before I trust the app.',
  },
  {
    id: 'sensor-hub',
    title: 'FreeRTOS sensor hub (STM32G474)',
    tagline:
      'CubeMX for clocks and HAL, but the app/CLI/telemetry/fault code lives outside the generated tree so regeneration doesn\u2019t wreck git. v0.1 uses stub sensor data; I2C is wired for the next pass.',
    summary:
      'Nucleo board at 170 MHz, FreeRTOS with a 1 kHz tick. Three real tasks I care about: app (samples on a 100 ms cadence when RUN), CLI (blocking UART line reader), telemetry (drains a queue and prints one line per frame). printf goes out LPUART1 behind a mutex so logs don\u2019t interleave. Telemetry publish is non-blocking: if the queue fills, I record a fault and move on instead of wedging the sampler. TIM6 runs HAL_GetTick because SysTick belongs to the kernel. Boot prints reset reason from RCC->CSR before anything else talks.',
    github: 'https://github.com/Seaphant/stm32-rtos-sensor-hub',
    tags: ['C', 'STM32', 'FreeRTOS', 'UART', 'I2C', 'CubeMX'],
    focus: 'RTOS / platform',
    highlights: [
      'Layer split: Core/Drivers from Cube, everything I write under App/, Services/, modules/, Common/.',
      'Telemetry higher priority than CLI so the queue doesn\u2019t grow forever when I paste a long command.',
      'Fault ring buffer in RAM: UART overrun and queue drop are real codes today; I2C faults are stubbed for sensors later.',
      'Telemetry lines are key=value so I can grep a capture without a custom parser.',
    ],
    challenges: [
      'Cube regeneration is only workable if the hooks are three lines in USER CODE. I kept it that small on purpose.',
      'Heap + stack sizing was back-of-envelope first; I\u2019ll tighten it once real drivers land.',
    ],
    whyItMatters:
      "It's the skeleton I'd reuse on the next board: tasks, observability, and a place to drop real I2C drivers without fighting Cube.",
    interviewTalkingPoint:
      'I can explain why telemetry is non-blocking and what happens when the CLI hogs the UART.',
  },
  {
    id: 'zuno',
    title: 'ZUNO \u00b7 coupon site',
    tagline:
      'Team project: React + TS front end, Express + Mongo back end. Search, filters, QR codes, and a messy but practical image pipeline when the APIs disagree.',
    summary:
      'Not embedded, but it\u2019s honest work: paginated API, compound indexes, express-validator on every route, soft delete for coupons. Front end tries the API first, falls back to mock JSON if the server\u2019s down. Images go through a chain (Open Food Facts, shopping APIs, then hand-curated fallbacks). Lots of memo/useCallback because the cards re-rendered too often early on.',
    github: 'https://github.com/Seaphant/ZUNO',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'Vite'],
    focus: 'Full-stack',
    highlights: [
      'Mongo indexes match how we actually query: store + active + expiry, category, brand.',
      'Validation returns structured 400s, which are easier to debug than a generic 500.',
      'Image fetch tries multiple providers; when one rate-limits, the next one gets a shot.',
    ],
    challenges: [
      'Image coverage was the long tail: one API never has everything.',
      'Keeping Mongoose helpers (virtuals, isValid) next to the schema stopped logic from drifting.',
    ],
    whyItMatters:
      'Recruiters sometimes want proof I can ship a web stack too. This is that, without pretending it\u2019s firmware.',
    interviewTalkingPoint:
      'Ask how we handle a dead image CDN or a flaky coupon API. The answer is retries and fallbacks, not hope.',
  },
]

export type Experience = {
  company: string
  role: string
  location: string
  period: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    company: 'Avicena Tech',
    role: 'Software Engineering Intern \u2013 System Integration',
    location: 'Sunnyvale, CA',
    period: 'Apr 2026 to present',
    bullets: [
      'Building Python host tools and automation scripts for ASIC characterization, hardware validation, and embedded device communication across SPI, I2C, and UART.',
      'Contributing to PyQt6 GUI used by hardware and systems teams to evaluate optical transceiver performance and manage power sequencing on custom interface boards.',
      'Supporting firmware bring-up and system integration across the full stack: ASIC register interface \u2192 microcontroller firmware \u2192 host application.',
      'Collaborating with cross-functional engineering teams to validate PCB-level designs, troubleshoot signal integrity, and automate data collection workflows.',
    ],
  },
]

export type SkillGroup = {
  label: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    skills: ['C', 'C++', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    label: 'Embedded / systems',
    skills: ['STM32', 'ESP32', 'FreeRTOS', 'Bare-metal', 'Bootloaders', 'Linker scripts', 'Flash', 'State machines'],
  },
  {
    label: 'Interfaces',
    skills: ['UART', 'I2C', 'SPI', 'GPIO', 'PWM', 'ADC', 'CRC32', 'JTAG/SWD'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'Linux', 'GDB', 'Logic analyzer', 'OpenOCD', 'CubeIDE', 'PlatformIO', 'VS Code'],
  },
  {
    label: 'Web (when needed)',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'Vite'],
  },
  {
    label: 'Hardware',
    skills: ['Motor control', 'Current sense', 'FSRs', '3D printing', 'OpenSCAD'],
  },
]

export const contact = {
  heading: 'Contact',
  description:
    "Currently interning at Avicena Tech. Open to connecting with engineers in embedded, firmware, or systems integration. If your team lives in schematics and `.c` files, I'd like to talk.",
}
