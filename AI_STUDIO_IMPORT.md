# Import this project into Google AI Studio

## Steps

1. Push this repo to GitHub (see commands below).
2. Go to aistudio.google.com → **Build** mode.
3. In the prompt box, click **Add files (+)** → **Import from GitHub**, select this repo.
4. Let AI Studio install dependencies from `package.json`.
5. As the first prompt, paste:

> This is an existing Vite + React + TypeScript project. Do not redesign it
> and do not replace it with a new scaffold. Install the dependencies from
> package.json, preserve the current UI and features, run the existing Vite
> app, and only fix build/runtime errors that prevent it from running.

## Push commands

```bash
cd toddler-game-player
# create an empty repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Do not commit `node_modules/` or `dist/` (already in `.gitignore`).
