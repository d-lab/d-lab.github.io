---
title: "From MSE to Bayesian Linear Regression"
date: "14 Feb. 2025"
---

!! This is just an AI generated demo post (But may still be an interesting read) !!

## 1. Mean Squared Error (MSE)

Let's start with the simplest approach to fitting a model: minimizing the Mean Squared Error. Given a model $f_\theta$ with parameters $\theta$, and data points $(T_i, R_i)$, we want to find:

$$
\theta^* = \arg\min_\theta \sum_{i=1}^N (R_i - f_\theta(T_i))^2
$$

This is intuitive and computationally simple, but it comes with hidden assumptions:
- We care equally about errors in any direction (symmetry)
- Larger errors are penalized quadratically
- We only want a point estimate of parameters
- We have no prior knowledge to incorporate

## 2. Maximum Likelihood Estimation (MLE)

We can generalize MSE by viewing it as a probabilistic problem. Instead of just minimizing error, we ask: what parameters make our observed data most likely?

We assume our observations follow:
$$
R = f_\theta(T) + \epsilon
$$
where 
$$
\epsilon \sim N(0, \sigma^2)
$$

This leads to maximizing:
$$
\theta^* = \arg\max_\theta \sum_{i=1}^N \log p(R_i|T_i;\theta)
$$

For Gaussian noise, this expands to:
$$
\theta^* = \arg\max_\theta \sum_{i=1}^N [-\frac{1}{2}\log(2\pi\sigma^2) - \frac{(R_i - f_\theta(T_i))^2}{2\sigma^2}]
$$

### Key Generalizations over MSE:
1. Can handle different noise distributions by changing $p(R|T;θ)$
2. Provides a probabilistic interpretation
3. Naturally extends to non-Gaussian cases
4. When noise is Gaussian, reduces exactly to MSE!

## 3. Maximum A Posteriori (MAP) Estimation

We can further generalize by incorporating prior knowledge about parameters. Using Bayes' rule:
$$
p(\theta|D) \propto p(D|\theta)p(\theta)
$$

The MAP estimate is:
$$
\theta^* = \arg\max_\theta [\log p(D|\theta) + \log p(\theta)]
$$

With a Gaussian prior $\theta \sim N(0, \Sigma_{prior})$, this becomes:
$$
\theta^* = \arg\max_\theta [-\sum_{i=1}^N \frac{(R_i - f_\theta(T_i))^2}{2\sigma^2} - \frac{\theta^T\Sigma_{prior}^{-1}\theta}{2}]
$$

### Key Generalizations over MLE:
1. Incorporates prior knowledge
2. Naturally provides regularization
3. MLE is a special case with uniform prior
4. Can handle ill-posed problems better

## 4. Full Bayesian Linear Regression

The final generalization is to move beyond point estimates and consider the full posterior distribution:
$$
p(\theta|D) = \frac{p(D|\theta)p(\theta)}{p(D)}
$$

For linear regression with:
- Gaussian prior: $\theta \sim N(0, \Sigma_{prior})$
- Gaussian likelihood: $R|T,\theta \sim N(f_\theta(T), \sigma^2)$

The posterior is also Gaussian with closed-form expressions for its mean and covariance.

### Key Generalizations over MAP:
1. Full uncertainty quantification
2. Can marginalize over parameters instead of optimizing
3. Handles multi-modal posteriors
4. Allows for hierarchical modeling
5. MAP is just the mode of this distribution

## The Complete Picture

These approaches form a clear hierarchy:
1. MSE: Simple point estimation
2. MLE: Probabilistic framework, still point estimation
3. MAP: Adds prior knowledge, still point estimation
4. Full Bayesian: Complete probabilistic treatment

Each step adds capabilities while maintaining the previous approach as a special case. The Bayesian approach is the most general, containing all others as special cases:
- MSE is MAP with Gaussian noise and uniform prior
- MLE is MAP with uniform prior
- MAP is the mode of the Bayesian posterior

This hierarchy shows how seemingly different approaches are deeply connected, each adding new capabilities while preserving the insights of simpler methods.