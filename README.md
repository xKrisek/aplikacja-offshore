# OFF-SHORE SAFETY

Aplikacja webowa przeznaczona do edukacji i oceny stanu technicznego środków ochrony indywidualnej (ŚOI) w środowisku offshore i outdoor.

## Opis projektu

Aplikacja OFF-SHORE SAFETY to interaktywne narzędzie edukacyjne i diagnostyczne, które pomaga użytkownikom:

- **Poznać podstawy bezpieczeństwa** w branży offshore i outdoor poprzez bazę wiedzy
- **Ocenić stan techniczny** środków ochrony indywidualnej (ŚOI)
- **Zrozumieć czynniki wpływające** na degradację sprzętu ochronnego
- **Dobrać odpowiednie ŚOI** do warunków pracy

### Główne funkcje

#### 1. Baza Wiedzy
- Artykuły edukacyjne na temat bezpieczeństwa w środowisku offshore
- Informacje o czynnikach starzeniowych wpływających na ŚOI
- Słowniczek terminów branżowych
- Przewodnik po zawodach związanych z offshore i outdoor

#### 2. Narzędzie Oceny Stanu Technicznego
- Interaktywna ocena stanu technicznego różnych typów ŚOI
- System punktowy oceny kryteriów
- Szczegółowe wyniki z rekomendacjami
- Obsługa różnych kategorii sprzętu (hełmy ochronne, odzież, itp.)

#### 3. Wielojęzyczność
- Pełne wsparcie dla języków: polski (PL), angielski (EN), niemiecki (DE)
- Automatyczne zapamiętywanie wybranego języka w przeglądarce

## Technologie

- **Frontend**: React z Vite (JavaScript)
- **Routing**: React Router
- **UI Components**: React Select, React Icons
- **Stylowanie**: CSS Modules

## Struktura projektu

```
src/
├── App.jsx                 # Główny komponent aplikacji
├── main.jsx                # Punkt wejścia aplikacji
├── App.css                 # Główne style aplikacji
├── index.css               # Globalne style
├── components/
│   ├── bazaWiedzy.jsx      # Komponent bazy wiedzy
│   ├── bazaWiedzy.css      # Style bazy wiedzy
│   ├── Narzedzie.jsx       # Komponent narzędzia oceny
│   ├── Narzedzie.css       # Style narzędzia
│   └── Narzedziecopy.jsx   # Kopia komponentu narzędzia
└── assets/
    ├── data-PL.json        # Dane w języku polskim
    ├── data-EN.json        # Dane w języku angielskim
    ├── data-DE.json        # Dane w języku niemieckim
    └── [ikony i obrazy]    # Zasoby graficzne
```

## Instalacja i uruchomienie

### Wymagania wstępne
- Node.js (wersja 16 lub nowsza)
- npm

### Instalacja zależności
```bash
npm install
```

### Uruchomienie w trybie deweloperskim
```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173`

## Konfiguracja

### Pliki językowe
Dane aplikacji są przechowywane w plikach JSON w katalogu `src/assets/`:
- `data-PL.json` - wersja polska
- `data-EN.json` - wersja angielska
- `data-DE.json` - wersja niemiecka (nie skończona)

Struktura danych zawiera:
- `knowledgeBase`: tablica artykułów bazy wiedzy
- `conditionTool`: dane narzędzia oceny stanu technicznego
- `textUI`: teksty interfejsu użytkownika

### Dodawanie nowego języka
1. Utwórz nowy plik `data-XX.json` w `src/assets/`
2. Przetłumacz wszystkie teksty z istniejącego pliku
3. Dodaj nowy język do tablicy `languageOptions` w `App.jsx`
4. Dodaj odpowiednią flagę kraju w `src/assets/`

**UWAGA!**
Zmiana języka nie jest w pełni obsługiwana. Wciąż zawiera błędy.
