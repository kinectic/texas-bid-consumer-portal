---
name: discord-operations
description: Design, organize, and operate Discord as a structured workspace for Zee and Dylan, including server architecture, channels, categories, role/permission design, and Discord Developer Portal understanding. Use when planning or improving a Discord server, preparing a bot/app setup, organizing project lanes, or making Discord function as an operational control center instead of just a chat room.
---

# Discord Operations

## Overview

Use this skill to treat Discord as an organized operating environment rather than just a messaging surface.

The purpose of this skill is to help Zee understand:

- how a Discord server should be structured
- how work should be organized into categories and channels
- how permissions and roles should be handled safely
- how the Discord Developer Portal works
- how Discord can become a useful operational control center for Dylan

This skill is broader than simply sending messages to Discord.

## What This Skill Is For

Use this skill when:

- designing or improving a Discord server
- deciding what categories and channels should exist
- organizing project lanes inside Discord
- planning bot/app capabilities
- understanding or configuring the Discord Developer Portal
- deciding how Zee should operate inside Discord
- reducing Discord clutter and permission confusion

## Server Architecture

Treat server structure as operational design.

Think in terms of:

- what kinds of work exist
- which work should be visible vs private
- which channels are for action vs reference
- how to keep categories from becoming junk drawers
- how to organize long-running projects so they stay legible

Useful category types often include:

- command / control
- project lanes
- inbox / triage
- updates / logs
- references / pinned information
- private operator/admin areas

Do not create too many channels before the workflow is real.

## Channel Design

Each channel should have a clear reason to exist.

A good channel has:

- a specific purpose
- a clear audience
- a reason it is separate from neighboring channels
- a realistic chance of being used consistently

Bad channel design usually looks like:

- too many overlapping channels
- channels created for hypothetical future use
- no distinction between action channels and archive/reference channels
- project work scattered across unrelated places

## Role And Permission Design

Handle roles and permissions conservatively.

Think about:

- who should see what
- who should manage what
- what the bot/app should actually be allowed to do
- how to avoid over-granting broad powers

Prefer:

- the minimum useful permission set
- clear separation between admin/moderation/operator/bot roles
- deliberate access boundaries

Avoid:

- giving broad admin permission casually
- overcomplicated role stacks without clear purpose
- permission systems that no one can reason about later

## Discord Developer Portal Understanding

Understand the Developer Portal as the control plane for the app/bot side.

This includes:

- application setup
- bot user creation
- token sensitivity
- OAuth scopes
- invite URL logic
- privileged intents
- app capability boundaries
- what features require explicit enabling

Tokens, secrets, and privileged bot capabilities should always be treated as sensitive.

## Bot And App Safety

When reasoning about the app side, be careful with:

- bot token exposure
- overbroad OAuth scopes
- overbroad guild permissions
- privileged intents that are not actually needed
- assuming Discord convenience justifies weak security

Do not expose sensitive values in chat or casual notes.

## Operational Usage

Use Discord intentionally.

Decide:

- where Zee posts updates
- where project discussions belong
- what channels are for control vs discussion vs archives
- whether threads should be used for contained project work
- how to keep work readable for Dylan

Discord should reduce confusion, not amplify it.

## Migration Guidance

When moving work into Discord:

1. decide what the main categories of work are
2. decide what Dylan needs to see easily
3. decide what should be public to the server vs private to operations
4. create only the channels needed for the next working version
5. improve structure after real usage reveals friction

Do not overbuild the server before usage patterns are clear.

## Guiding Principle

Use this rule:

> Build Discord as an operational workspace with clear structure, clear permissions, and clear purpose.

And this counter-rule:

> Do not turn Discord into a cluttered maze of channels, roles, and permissions just because the platform allows it.

## Intent

This skill exists to help Zee make Discord useful as a real operating environment for Dylan.

The goal is:

- clearer organization
- safer app/bot setup
- better project visibility
- cleaner operational structure
- less Discord chaos