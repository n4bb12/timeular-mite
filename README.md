<h1 align="center">
  ⏱ Timeular → Mite
</h1>

<p align="center">
  Synchronize your Timeular calendar entries into Mite
</p>

<p align="center">
  <a href="https://raw.githubusercontent.com/n4bb12/timeular-mite/master/LICENSE">
    <img alt="License" src="https://flat.badgen.net/github/license/n4bb12/timeular-mite?icon=github">
  </a>
  <a href="https://github.com/n4bb12/timeular-mite/issues/new/choose">
    <img alt="Issues" src="https://flat.badgen.net/badge/github/create issue/pink?icon=github">
  </a>
</p>

## Guide

Use this script to synchronize Timeular calendar entries for your configured time range into Mite.

The first script helps you set up mapping rules to determine which Timeular activites relate to which Mite project & service.

The second script allows you to one-way-sync your Timeular calendar entries into Mite.

### Step 1 — Project Setup

- Fork the project.
- Clone the fork.
- Install dependencies by running `yarn`

### Step 2 — Authentication

Timeular and Mite can only be accessed with API credentials. Please follow these steps:

- Create a copy of `config/.env.template` named `config/.env`.
- Set the Timeular API key and secret from:  
  https://profile.timeular.com/#/app/account
- Set your Mite account name and the API key from:  
  https://MITE_ACCOUNT_NAME.mite.yo.lk/myself

### Step 3 — Activity Mapping

Before you can sync entries you need to configure how time recordings should be mapped.
To make this easy for you, a convenience script fetches Timeular activities and Mite projects and services and creates a mapping file for you.

- Run `yarn config:init`
- Open `config/mapping.ts`
- Change the project and service values using the generated types.

You can repeat `yarn config:init` as many times as you want to update the generated types.
If your current mapping contains invalid activities, projects or services, they will be reset.
Your valid mappings

### Step 4 — Synching Once

Within the used range, synchronization will process each day individually. First the entries for a day are deleted, then new ones are created that correspond with the Timeular entries for that day.

If a day has locked entries that day will be skipped. This would require merging the records and would be difficult to implement. Also it would potentially require deleting the locked entry.

- Run `yarn sync <range>`  
  The range can be `today`, `yesterday`, or a date in ISO 8601 format.

### Step 5 — Scheduled Synching

In `.github/workflows/schedule.yml` you can find a GitHub Actions Workflow that syncs yesterday's entries at 1:00 a.m.

To make it work you need to first complete step 3.

Then [create a secret](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) on your forked GitHub repository.

- Name: `MAPPING_TS`
- Value: Copy and paste the contents of your `config/mapping.ts`

Likewise, you'll also need to configure secrets for the API credentials from step 2.

### Enjoy! 🍻
