---
title: Authentication
has_children: true
nav_order: 1
parent: Architecture
---

## Authentication

Figgy currently supports three main types of authentication. Regardless of which authentication method works best
for your use case, all three options enforce security best practicies including:

- Single sign on
- Multi-factor authentication
- Temporary session credentials for all Figgy activity with a max duration of 12 hours
- All temporary AWS credentials are encrypted and cached in a local vault


The three main types of authentication are: