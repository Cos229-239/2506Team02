# 🧙 Loot & Lore: AI-Powered RPG Content Generator

This React Native app lets users generate Dungeons & Dragons-style **Monsters**, **Characters**, **Spells**, and **Items** using OpenAI's GPT and DALL·E. 
Results are displayed with dynamic card layouts and generated illustrations.

---

## 📦 Features
- Monster generation with stats, lore, and images
- Modular structure to support Characters, Spells, and Items
- Styled UI with consistent theme and custom font (Aclonica)

---

## 🛠 Prerequisites

1. **Node.js** installed (preferably via nvm)
2. **Expo CLI** installed globally:
```bash
npm install -g expo-cli
```
3. **npm** for package management
4. A valid **OpenAI API key**

---

## 🚀 Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/Cos229-239/2506Team02.git
cd loot-and-lore
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
Create a `.env` file in the root with:
```
OPENAI_API_KEY=your-api-key-here
```

### 4. Add Fonts (Aclonica)
Make sure the font `Aclonica` is included in your assets and loaded via `expo-font` in `App.js`:
```js
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';

const [fontsLoaded] = useFonts({
  Aclonica: require('./assets/fonts/Aclonica-Regular.ttf'),
});
```

> You can download Aclonica from [Google Fonts](https://fonts.google.com/specimen/Aclonica)

### 5. Start the App
```bash
npx expo start
```

---

## 🔑 File Overview

| File | Purpose |
|------|---------|
| `App.js` | App entry point |
| `ChatScreen.js` | Main logic for sending prompts and rendering monster cards |
| `Monster.js` | Class to structure monster data |
| `MonsterCard.js` | Renders monster stat block and abilities |
| `MonsterImage.js` | Renders and regenerates monster images |
| `styles.js` | Centralized theme and color styles |
| `prompts.js` | AI prompt templates for different content types |

---

## 🧼 Optional Clean Commands
```bash
rm -rf node_modules
rm package-lock.json
npm install
npx expo start -c
```
