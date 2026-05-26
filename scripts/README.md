# Mock Test Generator

This directory contains the mock test generation script for the Syllab platform.

## Overview

`generate-mocks.mjs` generates 79 missing mock test JSON files for the platform by calling the backend's `/api/questions/batch` endpoint. It creates realistic, previous-year-level questions for real Indian competitive exams.

**Exams covered:**
- JEE Main (15 mocks, 75 questions each)
- NEET (15 mocks, 200 questions each)
- EAMCET (15 mocks, 160 questions each)
- APEAMCET (15 mocks, 160 questions each)
- VITEEE (10 mocks, 125 questions each)
- BITSAT (10 mocks, 130 questions each)

**Total:** 80 mocks (jee-mock-1 already exists, so 79 are generated)

## Prerequisites

1. **Backend running:** The backend server must be running at `http://localhost:5000`
   ```bash
   cd "C:/Users/naras/OneDrive/Desktop/GIT Syllab backend/syllab-backend-main"
   npm run dev  # or node server.js
   ```

2. **Node.js:** Installed and available in PATH

## Usage

### Generate all mocks
```bash
npm run build:mocks
```

Or directly:
```bash
node scripts/generate-mocks.mjs
```

### Expected runtime
- Approximately 30-60 minutes depending on network speed and backend response times
- Rate limiting: 500ms between mocks to avoid overwhelming the backend
- The script has automatic retry logic with exponential backoff for failed requests

## Output

Generated files are written to `public/mocks/<exam>/` directories:
- `public/mocks/jee/jee-mock-2.json` through `jee-mock-15.json`
- `public/mocks/neet/neet-mock-1.json` through `neet-mock-15.json`
- `public/mocks/eamcet/eamcet-mock-1.json` through `eamcet-mock-15.json`
- `public/mocks/apeamcet/apeamcet-mock-1.json` through `apeamcet-mock-15.json`
- `public/mocks/vit/vit-mock-1.json` through `vit-mock-10.json`
- `public/mocks/bitsat/bitsat-mock-1.json` through `bitsat-mock-10.json`

Each file follows the MockPaper JSON schema (see `/public/mocks/jee/jee-mock-1.json` for reference).

## Question Generation Strategy

### Difficulty Distribution
- 30% Easy
- 50% Medium
- 20% Hard

### Subject Distribution

**JEE (75 questions):**
- Physics: 25
- Chemistry: 25
- Mathematics: 25

**NEET (200 questions):**
- Physics: 45
- Chemistry: 45
- Botany: 50
- Zoology: 50
- Biology: 10

**EAMCET (160 questions):**
- Physics: 40
- Chemistry: 40
- Mathematics: 80

**APEAMCET (160 questions):**
- Physics: 40
- Chemistry: 40
- Mathematics: 80

**VITEEE (125 questions):**
- Physics: 35
- Chemistry: 35
- Mathematics: 40
- English/Aptitude: 15

**BITSAT (130 questions):**
- Physics: 30
- Chemistry: 30
- Mathematics: 40
- English: 15
- Logical Reasoning: 15

### Chapter Coverage
Questions are distributed across multiple chapters per subject to ensure realistic exam-level variety. For example:
- Physics chapters include: Kinematics, Laws of Motion, Thermodynamics, Electromagnetism, Optics, Modern Physics, etc.
- Chemistry chapters include: Mole Concept, Atomic Structure, Bonding, Equilibrium, Organic Chemistry, etc.
- Mathematics chapters include: Calculus, Algebra, Trigonometry, Geometry, etc.

## Backend API

The script calls the `/api/questions/batch` endpoint with the following request format:

```json
{
  "classLevel": "11+12",
  "subject": "Physics",
  "chapter": "Kinematics",
  "difficulty": "medium",
  "count": 10
}
```

Response format:
```json
{
  "questions": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "explanation": "...",
      "difficulty": "medium",
      "chapter": "Kinematics",
      "year": 2023
    }
  ]
}
```

## Error Handling

The script includes:
- **Retry logic:** Up to 3 retries per failed request with exponential backoff
- **Graceful degradation:** If the backend is offline, the script will fail with clear error messages
- **Partial success:** If some mocks fail to generate, successful ones are still saved
- **Detailed logging:** All progress and errors are logged to console

## Troubleshooting

### Backend not running
**Error:** `Failed to fetch Physics/Kinematics after 3 retries: Failed to fetch`

**Solution:** Start the backend server:
```bash
cd "C:/Users/naras/OneDrive/Desktop/GIT Syllab backend/syllab-backend-main"
npm run dev
```

### Incorrect question format
**Error:** `Invalid response format` or question mapping fails

**Solution:** Check that the backend's `/api/questions/batch` endpoint returns questions with the correct structure (see Backend API section above).

### Insufficient questions generated
**Warning:** `jee-mock-2: Only 60 questions generated, expected 75`

**Solution:** The backend may have rate-limited or failed. Wait and try again. The script is tolerant and will save what it has.

### Directories don't exist
The script automatically creates `public/mocks/<exam>/` directories if they don't exist.

## Updating the Script

To modify question generation:

1. **Change difficulty distribution:** Edit the `distributeDifficulty()` function
2. **Change subject distribution:** Edit the `EXAM_CONFIGS` object
3. **Change chapter selection:** Edit the `selectChapters()` function
4. **Change question mapping:** Edit the `mapQuestion()` function

## Dependencies

The script uses only Node.js built-in modules:
- `node:fs` (file system)
- `node:path` (path utilities)
- `node:url` (URL utilities)

The Fetch API is used for HTTP requests (available in Node.js 18+).

## Next Steps

After generation completes:

1. **Verify files:** Check that `public/mocks/<exam>/` directories contain JSON files
2. **Test loading:** Visit the Mock Tests page and verify all 80 mocks appear
3. **Spot-check questions:** Open a few mocks and verify question content and formatting
4. **Build frontend:** Run `npm run build` to ensure the frontend builds successfully

## Performance Notes

- Script generates questions on-demand from the backend (no local generation)
- Backend caches questions in Firestore to avoid redundant AI calls
- Total runtime depends on:
  - Network latency to backend
  - Backend's Gemini API response time (typically 1-3 seconds per batch)
  - Number of cache misses (first run of a subject/chapter will be slower)

For optimal performance:
- Run the script at a time when other services aren't competing for backend resources
- Ensure the backend has a stable internet connection (for Gemini API calls)
- Consider running during off-peak hours

## Questions?

Refer to the main project CLAUDE.md for broader context on the Syllab platform.
