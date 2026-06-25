# associate-software-engineer-lab
# DownLabs Associate Software Engineer Lab - Day 02

This repository contains the deliverables for **Day 02 (Lab 2 - TypeScript Fundamentals and Clean Code Habits)**.

## 🚀 Lab 2: Task Management Module
Implemented a modular, strongly-typed Task Management component using pure TypeScript features including Explicit Interfaces, Literal Types, Generics, and native DOM manipulation.

### 📁 Directory Structure Created
```text
src/
├── index.ts                   # Main Entry Point
└── modules/
    └── tasks/
        ├── types.ts           # Type Aliases, Interfaces & Literal Values
        ├── taskUtils.ts       # Generic & Pure logic functions
        └── TaskUI.ts          # Native DOM Layout Layer

## 🧪 Unit Testing (Lab 3)

We have configured a lightweight, secure unit testing workflow that runs natively without hitting binary/security sandbox restrictions.

### Running Tests
To execute the test suites locally using `pnpm`, run the following command:
```bash
pnpm test