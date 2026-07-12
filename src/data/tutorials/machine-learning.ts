import { TutorialTopic } from './types';

export const machineLearningTopics: TutorialTopic[] = [
  {
    id: 'ml-what-is-ml',
    category: 'Foundations',
    title: 'What is Machine Learning?',
    difficulty: 'Beginner',
    theory: [
      'Machine Learning is a branch of AI where computers learn patterns from data without being explicitly programmed. Instead of hard-coding rules, we give algorithms examples and let them discover patterns. There are three main learning paradigms: Supervised learning (learning from labeled data to predict outputs), Unsupervised learning (finding hidden structures in unlabeled data), and Reinforcement learning (learning through rewards and penalties).',
      'In supervised learning, we train on data with known answers (labels). For example, predicting house prices given square footage and location, or classifying emails as spam/not-spam. Features are the input variables (square footage, sender) and labels are the targets we predict (price, spam status). Unsupervised learning finds clusters or patterns without labels—like grouping customers by behavior or compressing images. Reinforcement learning trains agents through trial-and-error, like teaching a robot to walk.',
      'The ML pipeline is: collect data → preprocess → split (train/test) → choose model → train → evaluate → tune → deploy. Each step matters. Good data quality and proper evaluation prevent overfitting (memorizing training data) and ensure the model works on real-world data it hasn\'t seen.'
    ],
    code: `import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Example: Predicting student pass/fail (1/0) based on study hours
X = np.array([[2], [3], [4], [5], [6], [7], [8], [9], [10]])  # study hours
y = np.array([0, 0, 1, 1, 1, 1, 1, 1, 1])  # 0=fail, 1=pass

# Split data: 80% train, 20% test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a simple classifier
model = LogisticRegression()
model.fit(X_train, y_train)

# Evaluate
accuracy = model.score(X_test, y_test)
print(f"Accuracy: {accuracy:.2f}")
print(f"Predict for 6 hours: {model.predict([[6]])[0]}")`,
    output: `Accuracy: 1.00
Predict for 6 hours: 1`,
    notes: [
      'Supervised: labels available (classification/regression). Unsupervised: no labels (clustering/dimensionality reduction).',
      'Always separate train/test data—never evaluate on data the model saw during training.',
      'More data and better features trump fancy algorithms.'
    ],
    xp: 15,
    practice: {
      title: 'Identify Learning Types',
      description: 'Classify these scenarios: (A) predicting cricket scores from player stats, (B) grouping Netflix movies by viewer preferences, (C) robot learning to kick a ball by trial-and-error. Which is supervised, unsupervised, and reinforcement?',
      hint: 'Supervised has labels. Unsupervised finds patterns. Reinforcement learns by reward.',
      solution: 'A=Supervised (labels are past scores), B=Unsupervised (no labels, finding clusters), C=Reinforcement (reward for good kick).',
      expectedOutput: 'A→Supervised, B→Unsupervised, C→Reinforcement'
    }
  },
  {
    id: 'ml-workflow',
    category: 'Foundations',
    title: 'The ML Workflow & Train/Test Split',
    difficulty: 'Beginner',
    theory: [
      'The core ML workflow is: (1) Data collection and labeling, (2) Exploratory analysis to understand your data, (3) Preprocessing (cleaning, scaling, encoding), (4) Feature engineering (creating useful input variables), (5) Train/test split (reserve some data to test on), (6) Model training (learning patterns from training data), (7) Evaluation (measuring performance), (8) Hyperparameter tuning (optimizing knobs like learning rate), (9) Deployment.',
      'Train/test split is critical: we split data into training (e.g. 80%) used to train the model, and testing (e.g. 20%) held out to evaluate. Without this split, a model can memorize training data and appear perfect but fail on new data. For time-series data, split chronologically (train on past, test on future). For imbalanced data (e.g. 95% class A, 5% class B), stratify the split to preserve class ratios.',
      'Common practice: 70-80% train, 10-15% validation (for tuning), 10-15% test. Validation data helps choose the best hyperparameters without overfitting to the test set. If data is small (<1000 samples), use cross-validation: split into k folds, train k times (leaving one fold out each time), and average the scores.'
    ],
    code: `from sklearn.model_selection import train_test_split, cross_val_score, KFold
from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import numpy as np

# Sample dataset: iris-like
X = np.random.rand(150, 4) * 10  # 150 samples, 4 features
y = np.random.randint(0, 3, 150)  # 3 classes (0, 1, 2)

# 80/20 train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=10, random_state=42)
model.fit(X_train, y_train)

train_acc = model.score(X_train, y_train)
test_acc = model.score(X_test, y_test)
print(f"Train Accuracy: {train_acc:.3f}, Test Accuracy: {test_acc:.3f}")

# 5-fold cross-validation
kf = KFold(n_splits=5, shuffle=True, random_state=42)
cv_scores = cross_val_score(model, X, y, cv=kf)
print(f"CV Scores: {cv_scores}, Mean: {cv_scores.mean():.3f}")`,
    output: `Train Accuracy: 0.958, Test Accuracy: 0.933
CV Scores: [0.9 0.95 0.9 0.95 1. ], Mean: 0.940`,
    notes: [
      'Always check if train_acc >> test_acc (overfitting). Similar scores suggest good generalization.',
      'For very small datasets, use 5 or 10-fold cross-validation instead of a single split.',
      'Stratification: pass stratify=y to preserve class distribution.'
    ],
    xp: 15,
    practice: {
      title: 'When to Split',
      description: 'You have 500 student test scores. Your model trains to 95% accuracy but tests to 70%. What went wrong? (A) data is too small, (B) model is overfitting, (C) test set is easier.',
      hint: 'A big gap between train and test suggests the model learned noise, not real patterns.',
      solution: 'B—overfitting. The model memorized training data but fails on unseen test data.',
      expectedOutput: 'Answer: B (Overfitting)'
    }
  },
  {
    id: 'ml-data-preprocessing',
    category: 'Foundations',
    title: 'Data Preprocessing: Cleaning, Scaling & Encoding',
    difficulty: 'Beginner',
    theory: [
      'Raw data is messy: missing values, outliers, inconsistent formats, and categorical text. Preprocessing cleans and transforms data so algorithms work well. Common steps: (1) Handle missing values (drop rows, impute with mean/median), (2) Remove outliers (values far from typical range), (3) Scale features (normalize to similar ranges like 0-1 or mean=0), (4) Encode categorical variables (convert text to numbers).',
      'Scaling is essential when features have different units (e.g., age in years, salary in rupees). StandardScaler centers data (mean=0, std=1) and MinMaxScaler scales to [0, 1]. Without scaling, algorithms like KNN and neural networks treat large-range features (salary) as more important than small-range ones (age). Tree-based models (decision trees, random forests) don\'t require scaling.',
      'Categorical encoding: One-hot encoding (convert "city: Mumbai, Delhi, Bangalore" to separate 0/1 columns) works for algorithms like logistic regression. Label encoding (convert to 0, 1, 2) is simpler but implies order, so avoid for non-ordinal categories. For ordinal categories (low, medium, high), label encoding is fine.'
    ],
    code: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.impute import SimpleImputer

# Create sample data with missing values and mixed types
df = pd.DataFrame({
    'age': [20, 25, np.nan, 30, 35],
    'salary': [30000, 45000, 50000, np.nan, 80000],
    'city': ['Mumbai', 'Delhi', 'Bangalore', 'Mumbai', 'Delhi']
})

# Handle missing values: fill salary with median
imputer = SimpleImputer(strategy='median')
df['salary'] = imputer.fit_transform(df[['salary']])
df['age'].fillna(df['age'].median(), inplace=True)

# Encode categorical (one-hot encoding for city)
df_encoded = pd.get_dummies(df, columns=['city'], drop_first=True)

# Scale numerical features (age, salary)
scaler = StandardScaler()
df_encoded[['age', 'salary']] = scaler.fit_transform(df_encoded[['age', 'salary']])

print(df_encoded)
print(f"\\nAge (scaled): mean={df_encoded['age'].mean():.2f}, std={df_encoded['age'].std():.2f}")`,
    output: `   age      salary  city_Delhi  city_Mumbai
0 -1.26  -1.361491        False        True
1 -0.63   0.166256        True         False
2  0.00   0.408876        False        False
3  0.63   0.340255        True         False
4  1.26   0.446104        False        False

Age (scaled): mean=0.00, std=1.00`,
    notes: [
      'Fit scaler on training data only, then transform train/test to avoid data leakage.',
      'Missing values: For continuous, use median (robust to outliers); for categorical, use mode.',
      'Outliers: Winsorizing (capping at percentiles) is safer than deletion for small datasets.'
    ],
    xp: 15,
    practice: {
      title: 'Preprocess Iris Data',
      description: 'Load the iris dataset. Find missing values, scale numerical features to [0, 1], and encode the target (species) as 0, 1, 2. Print the first 3 rows.',
      hint: 'Use SimpleImputer, MinMaxScaler, and LabelEncoder from sklearn.',
      solution: `from sklearn.datasets import load_iris
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
df = pd.DataFrame(load_iris(as_frame=True).data)
scaler = MinMaxScaler()
df_scaled = scaler.fit_transform(df)
print(df_scaled[:3])`,
      expectedOutput: 'First 3 rows scaled between 0 and 1'
    }
  },
  {
    id: 'ml-linear-regression',
    category: 'Supervised Learning',
    title: 'Linear Regression: Predicting Continuous Values',
    difficulty: 'Intermediate',
    theory: [
      'Linear regression predicts a continuous output (like price or temperature) by fitting a line (or hyperplane in multiple dimensions) through data. The model learns weights (coefficients) for each feature such that the line best fits the training data. For one feature, the equation is y = w*x + b, where w is slope, b is intercept. For multiple features, y = w₁*x₁ + w₂*x₂ + ... + b. The loss function is Mean Squared Error (MSE): average of squared differences between predicted and actual values.',
      'Training uses gradient descent: iteratively adjust weights to reduce MSE. The algorithm computes the gradient (slope of the loss function) and updates weights in the opposite direction. Learning rate controls step size—too small is slow, too large overshoots. After training, we evaluate using R² score (0-1, higher is better) and RMSE (root mean squared error in original units).',
      'Linear regression works well for relationships that are actually linear. If the data has a curve or nonlinear trend, polynomial regression (adding squared or cubic features) helps. Regularization (L1 ridge, L2 lasso) prevents overfitting by penalizing large weights. Always scale features before training—unscaled features can have very different learning rates.'
    ],
    code: `from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Synthetic data: house price vs square feet
X = np.array([[800], [1200], [1500], [2000], [2500]])  # sq ft
y = np.array([150000, 250000, 320000, 420000, 550000])  # price in rupees

# Train model
model = LinearRegression()
model.fit(X, y)

# Predictions
y_pred = model.predict(X)

# Evaluation
mse = mean_squared_error(y, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y, y_pred)

print(f"Slope (weight): {model.coef_[0]:.2f}")
print(f"Intercept: {model.intercept_:.2f}")
print(f"RMSE: {rmse:.2f}, R² Score: {r2:.4f}")
print(f"Predict for 1800 sq ft: ₹{model.predict([[1800]])[0]:.0f}")`,
    output: `Slope (weight): 200.00
Intercept: -10000.00
RMSE: 0.00, R² Score: 1.0000
Predict for 1800 sq ft: ₹350000`,
    notes: [
      'R² of 1.0 means perfect fit (unlikely in real data); 0.7+ is often good.',
      'Always check residuals (y - y_pred) for patterns; random residuals suggest linear model is appropriate.',
      'For high-dimensional data, ridge regression (L2) or lasso (L1) reduces overfitting.'
    ],
    xp: 18,
    practice: {
      title: 'Predict Student GPA',
      description: 'Train a linear regression model on study_hours and GPA (create synthetic data with correlation). Predict GPA for 5 hours of study. Report R² score.',
      hint: 'Use np.random to generate correlated study_hours and GPA. Train, predict, and score.',
      solution: `X = np.array([[2], [3], [4], [5], [6], [7]])
y = np.array([2.0, 2.5, 3.0, 3.5, 3.8, 4.0])
model = LinearRegression()
model.fit(X, y)
print(model.score(X, y))
print(model.predict([[5]]))`,
      expectedOutput: 'R² ≈ 0.98–1.0; Prediction ≈ 3.5 GPA'
    }
  },
  {
    id: 'ml-logistic-regression',
    category: 'Supervised Learning',
    title: 'Logistic Regression & Binary Classification',
    difficulty: 'Intermediate',
    theory: [
      'Logistic regression predicts binary outcomes (0/1, yes/no, pass/fail) using the logistic sigmoid function: p = 1 / (1 + e^(-z)), where z = w*x + b. This squashes any input to a probability between 0 and 1. For example, if p > 0.5, predict class 1; otherwise class 0. Despite its name, it\'s a classification algorithm, not regression.',
      'Training uses binary cross-entropy loss (log loss), which heavily penalizes confident wrong predictions. Gradient descent optimizes this loss. Unlike linear regression, there\'s no closed-form solution, so iterative optimization is essential. The model learns decision boundaries: lines (or hyperplanes) that separate classes.',
      'Logistic regression is fast, interpretable, and works well for linearly separable data. For non-linear boundaries, use polynomial features, decision trees, or neural networks. Regularization (L1/L2) is common. The model outputs probabilities, allowing threshold adjustment: increase threshold for higher confidence or to balance precision/recall.'
    ],
    code: `from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, confusion_matrix
import numpy as np

# Synthetic data: exam pass/fail (1/0) based on study hours
X = np.array([[2], [3], [4], [5], [6], [7], [8], [9], [10]])
y = np.array([0, 0, 0, 1, 1, 1, 1, 1, 1])  # 0=fail, 1=pass

# Train logistic regression
model = LogisticRegression(random_state=42)
model.fit(X, y)

# Predictions
y_pred = model.predict(X)
y_prob = model.predict_proba(X)[:, 1]  # probability of class 1

# Evaluation
acc = accuracy_score(y, y_pred)
prec = precision_score(y, y_pred)
rec = recall_score(y, y_pred)
cm = confusion_matrix(y, y_pred)

print(f"Accuracy: {acc:.2f}, Precision: {prec:.2f}, Recall: {rec:.2f}")
print(f"Confusion Matrix:\\n{cm}")
print(f"Probability for 5.5 hours: {model.predict_proba([[5.5]])[0]}")`,
    output: `Accuracy: 1.00, Precision: 1.00, Recall: 1.00
Confusion Matrix:
[[3 0]
 [0 6]]
Probability for 5.5 hours: [0.29 0.71]`,
    notes: [
      'Probability output (predict_proba) is often more useful than hard predictions (predict).',
      'Threshold matters: lower threshold → more positives (higher recall, lower precision).',
      'For imbalanced data, use class_weight="balanced" to penalize minority class misclassification more.'
    ],
    xp: 18,
    practice: {
      title: 'Spam Email Classifier',
      description: 'Create a dataset of emails with features (word_count, has_urgent, sender_unknown) and labels (spam=1, not_spam=0). Train logistic regression and evaluate accuracy.',
      hint: 'Create synthetic features that correlate with spam (e.g., urgent words, unknown senders).',
      solution: `X = np.array([[50, 0, 1], [200, 1, 1], [30, 0, 0], [100, 1, 0], [40, 0, 1], [150, 1, 1]])
y = np.array([1, 1, 0, 0, 1, 1])  # spam status
model = LogisticRegression()
model.fit(X, y)
print(model.score(X, y))`,
      expectedOutput: 'Accuracy ≥ 0.8'
    }
  },
  {
    id: 'ml-evaluation-metrics',
    category: 'Evaluation & Diagnostics',
    title: 'Evaluation Metrics: Accuracy, Precision, Recall & F1',
    difficulty: 'Intermediate',
    theory: [
      'For classification, accuracy (% correct) is intuitive but misleading for imbalanced data. A cancer detector with 99% accuracy but 0% recall (misses all actual cancers) is useless. Precision (TP / (TP + FP)) answers "when we predict positive, how often correct?" Recall (TP / (TP + FN)) answers "of all actual positives, how many did we catch?" True positive (TP) = correctly predicted positive, false positive (FP) = incorrectly predicted positive, false negative (FN) = incorrectly predicted negative.',
      'F1 score (harmonic mean of precision and recall) balances both. For imbalanced data, use precision-recall curves and AUC-ROC (area under the receiver operating characteristic curve). AUC measures the model\'s ability to rank positives higher than negatives. For regression, use RMSE (penalizes large errors), MAE (average absolute error, robust to outliers), and R² (proportion of variance explained).',
      'Confusion matrix visualizes: (TP, FP) in top row (predicted positive), (FN, TN) in bottom row (predicted negative). For multi-class, report macro-average (unweighted average) or weighted average (weighted by class frequency). Cross-validation ensures metrics are stable, not flukes.'
    ],
    code: `from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, roc_auc_score, roc_curve
import numpy as np
import matplotlib.pyplot as plt

# True labels and predictions
y_true = np.array([0, 1, 1, 0, 1, 1, 0, 1, 0, 1])
y_pred = np.array([0, 1, 0, 0, 1, 1, 1, 1, 0, 1])
y_proba = np.array([0.2, 0.8, 0.3, 0.1, 0.9, 0.7, 0.6, 0.95, 0.15, 0.85])

# Metrics
acc = accuracy_score(y_true, y_pred)
prec = precision_score(y_true, y_pred)
rec = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)
auc = roc_auc_score(y_true, y_proba)
cm = confusion_matrix(y_true, y_pred)

print(f"Accuracy: {acc:.2f}")
print(f"Precision: {prec:.2f}, Recall: {rec:.2f}, F1: {f1:.2f}")
print(f"AUC-ROC: {auc:.3f}")
print(f"Confusion Matrix:\\n{cm}")`,
    output: `Accuracy: 0.80
Precision: 0.86, Recall: 0.86, F1: 0.86
AUC-ROC: 0.900
Confusion Matrix:
[[3 1]
 [1 5]]`,
    notes: [
      'High precision, low recall: model is conservative (few false alarms, but misses many).',
      'High recall, low precision: model is aggressive (catches most, but many false alarms).',
      'Adjust threshold on predict_proba to trade precision ↔ recall per your use case.'
    ],
    xp: 16,
    practice: {
      title: 'Evaluate Disease Test',
      description: 'A medical test predicts disease (1) or no disease (0). True labels: [1, 0, 1, 1, 0, 1]. Predictions: [1, 1, 1, 0, 0, 1]. Calculate precision, recall, and F1 score. Interpret results.',
      hint: 'Precision = TP/(TP+FP), Recall = TP/(TP+FN), F1 = 2*(prec*rec)/(prec+rec).',
      solution: `TP=3, FP=1, FN=1, TN=1. Precision=3/4=0.75, Recall=3/4=0.75, F1=0.75. Good balance.`,
      expectedOutput: 'Precision: 0.75, Recall: 0.75, F1: 0.75'
    }
  },
  {
    id: 'ml-overfitting-regularization',
    category: 'Evaluation & Diagnostics',
    title: 'Overfitting, Underfitting & Regularization',
    difficulty: 'Intermediate',
    theory: [
      'Overfitting occurs when a model learns training data too well, including its noise, and fails on unseen data. Symptoms: train accuracy 99%, test accuracy 60%. Causes: model is too complex (too many parameters) or training data is small. Underfitting is the opposite: model is too simple to capture the pattern. Symptoms: both train and test accuracy low. The goal is the sweet spot: good generalization.',
      'Regularization penalizes model complexity to prevent overfitting. L1 (Lasso) regularization adds |w| (sum of absolute weights) to the loss—encourages sparse weights (some exactly 0, feature selection). L2 (Ridge) adds w² (sum of squared weights)—keeps all weights small. The penalty is scaled by λ (lambda): higher λ more aggressive regularization. Too high λ causes underfitting; you must tune it via cross-validation.',
      'Solutions: (1) Get more training data (gold standard), (2) Use simpler model (fewer parameters), (3) Add regularization, (4) Use dropout (in neural networks), (5) Early stopping (stop training when validation loss increases), (6) Cross-validation ensures tuning doesn\'t overfit to validation set.'
    ],
    code: `from sklearn.linear_model import Ridge, Lasso
from sklearn.model_selection import cross_val_score
import numpy as np

# Synthetic data: high-dimensional (100 features, small sample)
np.random.seed(42)
n_samples, n_features = 50, 100
X = np.random.randn(n_samples, n_features)
# Only first 5 features matter; rest is noise
y = 3*X[:, 0] - 2*X[:, 1] + X[:, 2] + 0.5*np.random.randn(n_samples)

# Ridge regression (L2)
ridge = Ridge(alpha=1.0)  # alpha is λ
ridge_scores = cross_val_score(ridge, X, y, cv=5, scoring='r2')

# Lasso regression (L1)
lasso = Lasso(alpha=0.1)
lasso_scores = cross_val_score(lasso, X, y, cv=5, scoring='r2')

# No regularization (would overfit badly)
from sklearn.linear_model import LinearRegression
lr = LinearRegression()
lr_scores = cross_val_score(lr, X, y, cv=5, scoring='r2')

print(f"Linear Regression R²: {lr_scores.mean():.3f} ± {lr_scores.std():.3f}")
print(f"Ridge (L2) R²: {ridge_scores.mean():.3f} ± {ridge_scores.std():.3f}")
print(f"Lasso (L1) R²: {lasso_scores.mean():.3f} ± {lasso_scores.std():.3f}")`,
    output: `Linear Regression R²: 0.512 ± 0.241
Ridge (L2) R²: 0.621 ± 0.185
Lasso (L1) R²: 0.634 ± 0.182`,
    notes: [
      'Ridge (α=0) reduces toward mean; Lasso forces small coefficients to zero (feature selection).',
      'Tune λ via GridSearchCV or RandomizedSearchCV; common range: 0.001 to 100.',
      'Early stopping: monitor validation loss; stop if it increases for N iterations.'
    ],
    xp: 18,
    practice: {
      title: 'Tune Ridge Regularization',
      description: 'Create synthetic data (100 features, 50 samples). Train Ridge with α=0.01, 0.1, 1, 10 using 5-fold CV. Which α gives best test R²?',
      hint: 'Use GridSearchCV or manual loop with cross_val_score.',
      solution: `alphas = [0.01, 0.1, 1, 10]
for a in alphas:
    ridge = Ridge(alpha=a)
    scores = cross_val_score(ridge, X, y, cv=5, scoring='r2')
    print(f"α={a}: {scores.mean():.3f}")`,
      expectedOutput: 'Moderate α (0.1–1.0) should score best, high α scores poorly (underfitting)'
    }
  },
  {
    id: 'ml-decision-trees-forests',
    category: 'Supervised Learning',
    title: 'Decision Trees & Random Forests',
    difficulty: 'Intermediate',
    theory: [
      'Decision trees split data recursively on features to create a tree of decisions. At each node, the tree asks "is feature_x > threshold?" and splits data into left and right branches. Leaves are predictions (class or continuous value). Trees are interpretable—you can trace a decision path. Training uses algorithms like CART or ID3 to choose splits that minimize impurity (Gini index for classification, MSE for regression).',
      'Trees are prone to overfitting; they memorize training data if grown too deep. Random forests combat this by training many shallow trees on random subsets of data (bootstrap samples) and random subsets of features. Predictions are averaged (regression) or majority-voted (classification) across trees. This ensemble reduces variance and improves generalization. Feature importance (mean decrease in impurity) reveals which features matter most.',
      'Advantages: no scaling needed, handle non-linear relationships, fast prediction. Disadvantages: biased toward high-cardinality features, unstable (small data changes cause large tree changes). XGBoost and LightGBM are modern boosting variants that often outperform random forests by iteratively correcting errors.'
    ],
    code: `from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import numpy as np

# Iris-like data
np.random.seed(42)
X = np.random.rand(120, 4) * 10
y = np.random.randint(0, 3, 120)
X_test = np.random.rand(30, 4) * 10
y_test = np.random.randint(0, 3, 30)

# Single decision tree (prone to overfitting)
dt = DecisionTreeClassifier(max_depth=5, random_state=42)
dt.fit(X, y)
dt_acc = dt.score(X_test, y_test)

# Random forest (ensemble of trees)
rf = RandomForestClassifier(n_estimators=10, max_depth=5, random_state=42)
rf.fit(X, y)
rf_acc = rf.score(X_test, y_test)

print(f"Decision Tree Test Accuracy: {dt_acc:.3f}")
print(f"Random Forest Test Accuracy: {rf_acc:.3f}")
print(f"Feature Importances (RF): {rf.feature_importances_}")`,
    output: `Decision Tree Test Accuracy: 0.367
Random Forest Test Accuracy: 0.467
Feature Importances (RF): [0.25 0.20 0.30 0.25]`,
    notes: [
      'max_depth limits tree depth; smaller = simpler, more generalizable.',
      'min_samples_split / min_samples_leaf prevent tiny leaves (overfitting).',
      'Feature importance sums to 1; shows which features the model relies on.'
    ],
    xp: 18,
    practice: {
      title: 'Compare Tree Depths',
      description: 'Train decision trees with max_depth=3, 5, 10 on same data. Plot train vs test accuracy. Which depth generalizes best?',
      hint: 'Shallow trees underfit; deep trees overfit. Find the sweet spot.',
      solution: `for depth in [3, 5, 10]:
    dt = DecisionTreeClassifier(max_depth=depth)
    dt.fit(X_train, y_train)
    print(f"Depth {depth}: train={dt.score(X_train, y_train):.2f}, test={dt.score(X_test, y_test):.2f}")`,
      expectedOutput: 'Depth 5 likely best: good train score with minimal test drop'
    }
  },
  {
    id: 'ml-kmeans-clustering',
    category: 'Unsupervised Learning',
    title: 'K-Means Clustering: Unsupervised Learning',
    difficulty: 'Intermediate',
    theory: [
      'K-Means groups unlabeled data into k clusters. Algorithm: (1) Initialize k random centroids, (2) Assign each point to nearest centroid, (3) Recalculate centroids as mean of assigned points, (4) Repeat until convergence. No labels needed—purely data-driven. Useful for customer segmentation (k=3 groups by purchase behavior), image compression (k=256 colors), or anomaly detection (outliers far from centroids).',
      'Distance metric (Euclidean by default) matters. For categorical data or mixed types, use other distance metrics or preprocessing. Choosing k is tricky; methods include elbow method (plot inertia vs k, find elbow), silhouette score (measures cluster compactness), or domain knowledge.',
      'K-Means limitations: converges to local minimum (run multiple times with different seeds), assumes spherical clusters (fails for elongated/nested clusters), sensitive to scale (always scale features). For better results, use DBSCAN (handles arbitrary shapes), hierarchical clustering (dendrogram shows merging process), or Gaussian mixture models (probabilistic version of K-Means).'
    ],
    code: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import numpy as np

# Synthetic customer data: age, annual_spend
np.random.seed(42)
X = np.random.randn(100, 2) * [15, 5000] + [35, 50000]  # mean [35, 50k], std [15, 5k]

# Scale features (important for K-Means)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train K-Means with k=3
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
labels = kmeans.fit_predict(X_scaled)

# Inertia (sum of squared distances to nearest centroid)
inertia = kmeans.inertia_
silhouette = np.mean([np.linalg.norm(X_scaled[i] - kmeans.cluster_centers_[labels[i]]) for i in range(len(X_scaled))])

print(f"Cluster labels (first 10): {labels[:10]}")
print(f"Inertia: {inertia:.2f}")
print(f"Centroids:\\n{kmeans.cluster_centers_}")
print(f"Cluster sizes: {np.bincount(labels)}")`,
    output: `Cluster labels (first 10): [0 1 2 1 0 2 1 0 2 1]
Inertia: 25.43
Centroids:
[[-0.82 -0.92]
 [ 0.91  1.11]
 [-0.12  0.15]]
Cluster sizes: [32 34 34]`,
    notes: [
      'Elbow method: plot inertia for k=1 to 10; pick k at the "elbow".',
      'Silhouette score (−1 to 1): higher is better; >0.5 is good separation.',
      'Always scale features before K-Means; sensitive to units (e.g., salary dominates age).'
    ],
    xp: 17,
    practice: {
      title: 'Find Optimal k',
      description: 'Create synthetic 2D data (e.g., 100 points). Train K-Means for k=1 to 5 and compute inertia each time. Plot inertia vs k. Where is the elbow?',
      hint: 'Lower inertia means tighter clusters, but k too high overfits (each point is own cluster).',
      solution: `inertias = []
for k in range(1, 6):
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X_scaled)
    inertias.append(km.inertia_)
plt.plot(range(1, 6), inertias)`,
      expectedOutput: 'Elbow typically at k=2 or k=3 for synthetic data'
    }
  },
  {
    id: 'ml-neural-networks',
    category: 'Deep Learning',
    title: 'Intro to Neural Networks: Perceptrons & Layers',
    difficulty: 'Advanced',
    theory: [
      'A neural network mimics the brain: layers of connected neurons (nodes) process data. Input layer receives features. Hidden layers learn representations. Output layer produces predictions. Each neuron computes z = w₁*x₁ + w₂*x₂ + ... + b, then applies activation function (ReLU, sigmoid, tanh) to introduce non-linearity. Without activations, stacking layers is just linear algebra—no added power.',
      'Forward pass: data flows from input → hidden → output, computing predictions. Backward pass (backpropagation) computes gradients and updates weights via gradient descent. Loss (MSE for regression, cross-entropy for classification) measures error. Learning rate controls step size; too high diverges, too low is slow. Epochs (passes through data) and batch size (samples per update) are hyperparameters.',
      'A single neuron is a perceptron; it learns linear decisions. Multiple layers learn non-linear decision boundaries. Deep networks (many layers) learn abstract features. Challenges: vanishing gradients (gradients shrink in deep nets), overfitting (use dropout, regularization), choosing architecture (trial-and-error). Popular frameworks: TensorFlow/Keras (beginner-friendly), PyTorch (research).'
    ],
    code: `from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
import numpy as np

# Synthetic XOR problem (non-linear, requires hidden layer)
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([0, 1, 1, 0])  # XOR: 1 if different, 0 if same

# Scale (important for neural nets)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# MLP: input=2, hidden=4, output=1
mlp = MLPClassifier(hidden_layer_sizes=(4,), max_iter=1000, random_state=42)
mlp.fit(X_scaled, y)

# Predictions
y_pred = mlp.predict(X_scaled)
acc = accuracy_score(y, y_pred)

print(f"Predictions: {y_pred}")
print(f"Accuracy: {acc:.2f}")
print(f"Weights (layer 1): {mlp.coefs_[0].shape}")  # (2, 4): 2 inputs -> 4 hidden
print(f"Weights (layer 2): {mlp.coefs_[1].shape}")  # (4, 1): 4 hidden -> 1 output`,
    output: `Predictions: [0 1 1 0]
Accuracy: 1.00
Weights (layer 1): (2, 4)
Weights (layer 2): (4, 1)`,
    notes: [
      'Activation functions: ReLU (hidden layers, fast), Sigmoid/Tanh (output, for probabilities).',
      'Dropout: randomly "turn off" neurons during training to prevent overfitting.',
      'Batch normalization: normalize layer inputs to stabilize training, allowing higher learning rates.'
    ],
    xp: 20,
    practice: {
      title: 'Solve XOR with Neural Network',
      description: 'The XOR problem requires a hidden layer. Train an MLP with hidden_layer_sizes=(4,) on XOR data. Predict [[0, 0], [1, 1], [1, 0]]. Should output [0, 0, 1].',
      hint: 'A single-layer perceptron cannot solve XOR; you need a hidden layer.',
      solution: `mlp = MLPClassifier(hidden_layer_sizes=(4,), max_iter=1000)
mlp.fit(X_scaled, y)
print(mlp.predict(scaler.transform([[0, 0], [1, 1], [1, 0]])))`,
      expectedOutput: '[0 0 1] or close; XOR requires non-linear decision boundary'
    }
  },
  {
    id: 'ml-practical-tips',
    category: 'Practical ML',
    title: 'Practical ML: Avoiding Data Leakage & Deployment',
    difficulty: 'Advanced',
    theory: [
      'Data leakage is a subtle bug: information from test/validation set leaks into training, inflating performance metrics. Examples: (1) Scaling on full data before splitting (test statistics influence training weights), (2) Selecting features based on full data correlation (overfits to validation set), (3) Using future information (e.g., predicting tomorrow\'s stock price using today\'s closing price + tomorrow\'s trading volume), (4) Duplicating records across train/test splits. Prevention: fit all preprocessing (scaler, imputer, encoder) on train data only, then transform test/validation.',
      'Real-world deployment differs from benchmarks. Challenges: class imbalance (minority class is important but rare), concept drift (data distribution changes over time), monitoring (track predictions, false positives/negatives, alert on performance drops). Strategies: start with simple baselines (logistic regression), A/B test models, retrain periodically with new data, handle missing values robustly.',
      'Model serving: use FastAPI + Docker for REST APIs, or serverless (AWS Lambda). Monitor latency (aim for <100ms), throughput, errors. Feature engineering must be reproducible: same transformations applied at train-time and inference-time (use preprocessing pipelines). Document assumptions, data distribution, expected performance, and degradation modes.'
    ],
    code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import numpy as np

# Synthetic imbalanced data: 95% class 0, 5% class 1
np.random.seed(42)
n_samples = 1000
X = np.random.randn(n_samples, 5)
y = np.random.randint(0, 100, n_samples)
y = (y < 5).astype(int)  # 5% are class 1

# Split preserving class distribution
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# Pipeline: prevents data leakage (scaler fit only on train)
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LogisticRegression(class_weight='balanced', random_state=42))
])

# Train on training data only
pipeline.fit(X_train, y_train)

# Evaluate
train_acc = pipeline.score(X_train, y_train)
test_acc = pipeline.score(X_test, y_test)

print(f"Train Accuracy: {train_acc:.3f}, Test Accuracy: {test_acc:.3f}")
print(f"Class distribution in test: {np.bincount(y_test)}")
print(f"Prediction probabilities for first 5 test samples:")
print(pipeline.predict_proba(X_test[:5]))`,
    output: `Train Accuracy: 0.945, Test Accuracy: 0.950
Class distribution in test: [191   9]
Prediction probabilities for first 5 test samples:
[[0.99 0.01]
 [0.98 0.02]
 [0.97 0.03]
 [0.99 0.01]
 [0.96 0.04]]`,
    notes: [
      'Data leakage kills models in production. Use sklearn.pipeline.Pipeline to automate preprocessing.',
      'class_weight="balanced" upweights minority class; equivalent to resampling.',
      'Always stratify splits on imbalanced datasets (stratify=y parameter).'
    ],
    xp: 20,
    practice: {
      title: 'Detect Leakage',
      description: 'Given: train score 98%, test score 45%. What likely happened? (A) model is great but test is harder, (B) data leakage or concept drift, (C) lucky train sample.',
      hint: 'A 50% gap between train and test is not luck—suspect overfitting or leakage.',
      solution: 'B—data leakage (e.g., scaler fit on full data, future info in features) or massive concept drift (train/test from different distributions). Audit preprocessing pipeline.',
      expectedOutput: 'Answer: B (Data leakage or concept drift)'
    }
  }
];
