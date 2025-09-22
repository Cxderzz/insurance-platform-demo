# Insurance Platform Demo

## Background

This repository contains an **proof of concept** for an insurance platform for users to interact with insurance products. This project is built with:

- Angular (frontend)
- ASP.NET Core Web API (backend)
- Tailwind for styling (styling)
- EF Core w/ SQL server (data)

### In the short term, the following functionalities will be available

- Login capabilities
- Quote flow for vehicle policy
- Users can view policies
- Staff can search policies and manage user accounts
- Administrators can manage staff accounts

### To extend this project:

- User/Staff management of policies and policy editing
- More quote flows
- End to end audit history

### Disclaimer:

#### What this project is:

- A proof of concept
- Practice for me to work on my Angular and ASP.NET
- For fun

#### What this project isn't:

- Intending to implement full security hardening (only a minimal auth/identity setup)
- Intending to comply by compliance with industry standards
- Intending to prioritise data privacy or PII handling

Of course, these things would be nice, but my time is limited and in the wise words of Gandalf:

> _"All we have to decide is what to do wit hthe time that is given to us."_ - The Lord of the Rings (2001)

### File Structure

```bash
insurance-platform/
├── client/              # Angular frontend
│   ├── src/
│   └── angular.json
│
├── server/              # ASP.NET backend
│   ├── InsuranceAPI/    # Main API project
│   ├── InsuranceAPI.Tests/
│   └── InsuranceAPI.sln
│
├── scripts/             # Utility scripts for setup/start
├── docs/                # Self explanatory
├── docker-compose.yml   # Dev database container
└── README.md
```

## Quick Start

### Basic Prereqs

- Node 18+
  - Nvm is easiest
- npm
- .NET SDK 7+
  - `sudo pacman -Syu dotnet-runtime dotnet-sdk aspnet-runtime`
- Docker
  - I hope you're using a Unix derivative

### Setup

I made some scripts to make it easier. I'm not sure if there's an easier way to do this but it works.

Run this once:

```bash
git clone git@github.com:Cxderzz/insruance-platgorm-demo.git
cd insurance-platform
sudo chmod +x ./scripts/setup.sh
bash ./scripts/setup.sh
```

Dev server:
```bash
# front and back end
sudo chmod +x ./scripts/start-dev.sh
bash ./scripts/start-dev.sh

# db
docker compose up -d
# to stop
docker compose down
```

Note: This script starts the ASP.NET backend in the background, then starts the frontend and it will wait until you stop running front end to stop ASP.NET. Docker is managing the db currently. Eventually, I will migrate ASP.NET to be inside the docker container as well.

Deploy to prod:

```
TBA
```
