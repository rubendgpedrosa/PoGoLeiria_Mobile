# PoGoLeiria Mobile

> **No longer maintained.** This app was replaced by
> [PoGoLeiriaHub](https://github.com/rubendgpedrosa/PoGoLeiriaHub) (private) and the
> website at [pogoleiria.pt](https://pogoleiria.pt). The code is here for reference only.

A small Expo / React Native app I built in early 2023 for the PoGoLeiria Pokémon GO
community in Leiria. It listed the day's field research quests by reward category,
showed each PokéStop on a map and opened it in Google Maps.

The quest data came from [Poliswag](https://github.com/rubendgpedrosa/Poliswag), the
community's Discord bot, which published it as JSON: first to a GitHub repo, later to a
Firebase Realtime Database. That database is gone, so the app won't load anything today.

## Running it anyway

```bash
yarn install
npx expo start --tunnel
```

Scan the QR code with Expo Go. The map screen needs a Google Maps key in `app.json`
(`android.config.googleMaps.apiKey`). The key that was committed here has been deleted.
