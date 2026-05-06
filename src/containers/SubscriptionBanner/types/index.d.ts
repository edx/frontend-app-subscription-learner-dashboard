export interface SubscriptionBannerData {
  isSubscribed: boolean,
  subscriptionStatus: string,
  subscriptionStartDate: string,
  subscriptionEndDate: string,
  subscriptionRenewalDate: string,
  subscriptionRenewalPrice: string,
}
export type BannerItem = SubscriptionBannerData;
