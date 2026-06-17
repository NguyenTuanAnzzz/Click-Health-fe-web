export const hasActiveSubscription = (user, now = new Date()) => {
  if (!user || user.subscriptionStatus === 'NONE' || !user.subscriptionExpiry) {
    return false;
  }

  const expiry = new Date(user.subscriptionExpiry);
  return !Number.isNaN(expiry.getTime()) && expiry > now;
};

export const getBefastAccess = (user, now = new Date()) => {
  const activeSubscription = hasActiveSubscription(user, now);
  const attemptsLeft = user?.freeAttemptsBefastLeft ?? user?.freeAttemptsLeft ?? 0;

  return {
    activeSubscription,
    attemptsLeft,
    hasNoAttempts: !activeSubscription && attemptsLeft <= 0,
    isLowAttempts: !activeSubscription && attemptsLeft > 0 && attemptsLeft <= 2,
  };
};

