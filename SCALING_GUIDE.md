# Syllab Question Generation Scaling Strategy

To reach the target of **5,000+ high-quality competitive questions** (150 per chapter), we recommend a programmatic augmentation approach combined with LLM-assisted verification.

## 1. Programmatic Variation (The 1:10 Rule)
For every "Core Question" you write, you can generate 10 variations by substituting numerical values, chemical compounds, or biological organisms while keeping the logic identical.

### Template A: Physics (Numerical Substitution)
*   **Base:** A car starts from rest and accelerates at `{{ACCEL}}` m/s² for `{{TIME}}` seconds. Find the distance traveled.
*   **Logic:** $S = 0.5 * a * t^2$
*   **Variations:** `[a=2, t=5]`, `[a=5, t=10]`, `[a=1.5, t=20]`

### Template B: Chemistry (Isomorphic Reactions)
*   **Base:** Calculate the molarity of `{{SOLUTE}}` in a `{{VOLUME}}` L solution containing `{{MASS}}` g of the solute.
*   **Logic:** $M = (Mass / MolarMass) / Volume$
*   **Variations:** `[NaCl, 2L, 117g]`, `[K2SO4, 0.5L, 87g]`, `[C12H22O11, 1L, 342g]`

### Template C: Biology (Function/Organism Mapping)
*   **Base:** Identify the primary function of `{{ORGANELLE}}` in `{{CELL_TYPE}}` cells.
*   **Logic:** Attribute mapping.
*   **Variations:** `[Mitochondria, Eukaryotic]`, `[Chloroplast, Plant]`, `[Ribosome, Prokaryotic]`

## 2. LLM Prompting Strategy (The "Batch of 50" Prompt)
Use the following prompt with Gemini 1.5 Pro to generate valid JSON batches:

> "Generate 50 JEE Advanced level MCQs for Physics Chapter 'Rotation'. 
> Use the following JSON schema: { id, subject, chapter_id, chapter_name, difficulty: 'hard', question_text, options: [], correct_index, explanation, exam_type_tags: ['JEE'] }.
> ensure options are distinct and plausible distractors are included based on common student mistakes."

## 3. Data Integration Workflow
1.  **Generate:** Use the templates above to create raw data.
2.  **Validate:** Run a simple script (or use an online JSON validator) to ensure the `question_database.json` remains valid.
3.  **Merge:** Append new batches to the main array.
4.  **Audit:** Use the Syllab "Arena" to test-run 10 random questions from each new batch to verify difficulty.

## 4. Chapter Completion Checklist
| Chapter | Easy (50) | Medium (50) | Hard (50) | Total (150) |
| :--- | :---: | :---: | :---: | :---: |
| Basic Chem | ✅ | ✅ | ✅ | 150 |
| Atomic Str | ⚠️ | ⚠️ | ✅ | 60 |
| ... | ... | ... | ... | ... |
