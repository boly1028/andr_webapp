import { NftAsset, AdoAsset } from "@/modules/assets";

export const NFT_ITEMS: NftAsset[] = [
  // {
  //   id: 1,
  //   image:
  //     "https://lh3.googleusercontent.com/sDhM1yz--cp9As0bh1yPE5HY4f7lOp-Yh3_wMPTXitrXrNxKMjAHarW1st3fchHZ_4lOCH8sBMKDMYgYXf_YCvMt377ERZ2cpRBNow=w600",
  //   name: "mfer boy #4037",
  //   slug: "4037",
  //   type: "Digital art",
  //   chain: "TERRA",
  // },
  // {
  //   id: 2,
  //   image:
  //     "https://lh3.googleusercontent.com/lfLT98fGLJ_vgblkfwE6sttMVSqVTdf8oWIKEbTi7Y_TejgNUKoNDps07fjRMHdyX3Fy1azhUZ5zJG_As98UGq7BwSAs8GeME1T_9w=w600",
  //   name: "Doggy #7848",
  //   slug: "7848",
  //   type: "Digital art",
  //   chain: "TERRA",
  // },
  // {
  //   id: 3,
  //   image:
  //     "https://lh3.googleusercontent.com/hQyNnIvqqeDmInYI_c_R4tZFNldI2sPyng_GixaMb9KdAUlGsLAcnJfNaMEOj4XmTsNq_oVCOLjdWKcg0ZkRP20aQY-tsWP00zTE_lM=w600",
  //   name: "EA #2706",
  //   slug: "2706",
  //   type: "Digital art",
  //   chain: "TERRA",
  // },
];

export const ADO_ITEMS: AdoAsset[] = [
  {
    name: "App",
    type: "app",
    version: "0.1.0",
    lastActivity: "15 minutes ago",
    created: "Mar 12 2022",
    $class: "baseADO",
    $classifier: [],
    modifiers: ["add_mission_component", "claim_ownership", "update_address"],
  },
  {
    name: "CW20",
    type: "cw20",
    version: "0.1.0",
    lastActivity: "Mar 12 2022",
    created: "January 8, 2021",
    $class: "baseADO",
    $classifier: ["token"],
    modifiers: [
      "transfer",
      "burn",
      "send",
      "increase_allowance",
      "decrease_allowance",
      "transfer_from",
      "send_from",
      "burn_from",
      "mint",
      "update_marketing",
      "upload_logo",
    ],
  },
  {
    name: "CW20 Staking",
    type: "cw20_staking",
    version: "0.1.0",
    lastActivity: "February 2, 2021",
    created: "February 2, 2021",
    $class: "baseADO",
    $classifier: ["token"],
    modifiers: [
      "receive",

      "add_reward_token",
      "unstake_tokens",
      "claim_rewards",
      "update_global_indexes",
    ],
  },
  {
    name: "Lockdrop",
    type: "lockdrop",
    version: "0.1.0",
    lastActivity: "October 18, 2021",
    created: "October 18, 2021",
    $class: "baseADO",
    $classifier: ["sale"],
    modifiers: [
      "receive",
      "deposit_native",
      "withdraw_native",
      "deposit_to_bootstrap",
      "claim_rewards",
      "enable_claims",
      "withdraw_proceeds",
    ],
  },
  {
    name: "Merkle Airdrop",
    type: "merkle_airdrop",
    version: "0.1.0",
    lastActivity: "January 11, 2022",
    created: "January 11, 2022",
    $class: "baseADO",
    $classifier: [],
    modifiers: ["register_merkle_root", "claim", "burn"],
  },

  {
    name: "Auction",
    type: "auction",
    version: "0.1.0",
    lastActivity: "July 6, 2021",
    created: "July 6, 2021",
    $class: "baseADO",
    $classifier: ["sale"],
    modifiers: [
      "receive_nft",
      "place_bid",
      "claim",
      "update_auction",
      "update_owner",
      "cancel_auction",
    ],
  },
  {
    name: "Crowdfund",
    type: "crowdfund",
    version: "0.1.0",
    lastActivity: "November 22, 2021",
    created: "November 22, 2021",
    $class: "baseADO",
    $classifier: ["sale"],
    modifiers: [
      "mint",
      "start_sale",
      "purchase",
      "purchase_by_token_id",
      "claim_refund",
      "end_sale",
    ],
  },
  {
    name: "CW721",
    type: "cw721",
    version: "0.1.0",
    lastActivity: "March 13, 2022",
    created: "March 13, 2022",
    $class: "baseADO",
    $classifier: ["collectible"],
    modifiers: [
      "mint",
      "transfer_nft",
      "send_nft",
      "approve",
      "revoke",
      "approve_all",
      "revoke_all",
      "burn",
      "archive",
      "transfer_agreement",
    ],
  },
  {
    name: "Gumball",
    type: "gumball",
    version: "0.1.0",
    lastActivity: "July 6, 2021",
    $class: "baseADO",
    $classifier: ["sale"],
    created: "July 6, 2021",
    modifiers: ["mint", "buy", "set_sale_details", "switch_status"],
  },
  {
    name: "NFT Timelock",
    type: "nft_timelock",
    version: "0.1.0",
    lastActivity: "April 21, 2021",
    created: "April 21, 2021",
    $class: "baseADO",
    $classifier: ["escrow"],
    modifiers: [],
  },
  {
    name: "Wrapped CW721",
    type: "wrapped_cw721",
    version: "0.1.0",
    lastActivity: "December 9, 2021",
    $class: "baseADO",
    $classifier: ["collectible"],
    created: "December 9, 2021",
    modifiers: ["receive_nft"],
  },

  {
    name: "Splitter",
    type: "splitter",
    version: "0.1.0",
    lastActivity: "February 22, 2022",
    $class: "baseADO",
    $classifier: ["splitter"],
    created: "February 22, 2022",
    modifiers: ["update_recipients", "update_lock", "send"],
  },
  {
    name: "Timelock",
    type: "timelock",
    version: "0.1.0",
    lastActivity: "May 24, 2021",
    created: "May 24, 2021",
    $class: "baseADO",
    $classifier: ["escrow"],
    modifiers: ["hold_funds", "release_funds", "release_specific_funds"],
  },
  {
    name: "Vesting",
    type: "vesting",
    version: "0.1.0",
    lastActivity: "June 3, 2022",
    created: "June 3, 2022",
    $class: "baseADO",
    $classifier: [],
    modifiers: ["claim", "claim_all", "create_batch", "delegate", "undelegate"],
  },
  {
    name: "Weighted Distribution Splitter",
    type: "weighted_distribution_splitter",
    version: "0.1.0",
    lastActivity: "December 9, 2021",
    created: "December 9, 2021",
    $class: "baseADO",
    $classifier: ["splitter"],
    modifiers: ["update_recipients", "remove_recipient", "update_lock", "send"],
  },
  {
    name: "Vault",
    type: "vault",
    version: "0.1.0",
    lastActivity: "October 18, 2021",
    created: "October 18, 2021",
    $class: "baseADO",
    $classifier: ["finance"],
    modifiers: ["deposit", "withdraw", "update_strategy"],
  },
  {
    name: "Primitive",
    type: "primitive",
    version: "0.1.0",
    lastActivity: "February 2, 2022",
    created: "February 2, 2022",
    $class: "primitive",
    $classifier: [],
    modifiers: ["set_value", "delete_value"],
  },
  {
    name: "Address List",
    type: "address_list",
    version: "0.1.0",
    lastActivity: "November 17, 2021",
    created: "November 17, 2021",
    $class: "module",
    $classifier: ["address"],
    modifiers: ["add_address", "remove_address"],
  },
  {
    name: "NFT Offers",
    type: "cw721_offers",
    version: "0.1.0",
    lastActivity: "December 4, 2021",
    created: "December 4, 2021",
    $class: "module",
    $classifier: [],
    modifiers: ["place_offer", "cancel_offer", "accept_offer"],
  },
  {
    name: "Rates",
    type: "rates",
    version: "0.1.0",
    lastActivity: "April 24, 2021",
    created: "April 24, 2021",
    $class: "module",
    $classifier: ["sale"],
    modifiers: ["update_rates"],
  },
  {
    name: "Receipt",
    type: "receipt",
    version: "0.1.0",
    lastActivity: "May 26, 2022",
    created: "May 26, 2022",
    $class: "module",
    $classifier: ["sale"],
    modifiers: ["store_receipt", "edit_receipt"],
  },

  // Original Structure Sample
  // {
  //   id: 3,
  //   image:
  //     "https://lh3.googleusercontent.com/hQyNnIvqqeDmInYI_c_R4tZFNldI2sPyng_GixaMb9KdAUlGsLAcnJfNaMEOj4XmTsNq_oVCOLjdWKcg0ZkRP20aQY-tsWP00zTE_lM=w600",
  //   name: "Splitter Strategy",
  //   udid: "00891292",
  //   type: "Splitter",
  //   lastActivity: "15 minutes ago",
  //   created: "Mar 12 2022",
  // },
];
