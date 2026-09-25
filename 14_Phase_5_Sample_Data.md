# BranchCast — Phase 5 Sample Data

## Data Use
This is fictional, internally consistent sample data for the App Shell and Overview Dashboard. It must be used consistently across every Phase 5 screen.

Do not describe this data as live or connected to a real business.

## Organization
| Field | Value |
|---|---|
| Name | Luma Coffee Co. |
| Type | Multi-location specialty coffee brand |
| Region | Jordan |
| Timezone | Asia/Amman |
| Active locations | 6 |
| Audio zones | 10 |
| Players paired | 10 |
| Players online | 9 |
| Player needs attention | 1 |
| Unpaired zones | 1 |

## Current User
| Field | Value |
|---|---|
| Name | Amina Khalil |
| Initials | AK |
| Role | Organization Owner |
| Email | amina@lumacoffee.example |
| Current scope | All locations |

## Locations & Zones
| Location | Zone | Player | Current status | Now playing | Last seen |
|---|---|---|---|---|---|
| Abdali | Main Floor | BC-ABD-01 | Online | Morning Rhythm Playlist | 2 min ago |
| Abdali | Terrace | Not paired | Not Paired | No schedule | — |
| Sweifieh | Main Floor | BC-SWF-01 | Offline | Unknown | 18 min ago |
| Sweifieh | Counter | BC-SWF-02 | Online | Calm Focus Playlist | 3 min ago |
| Khalda | Main Floor | BC-KHD-01 | Online | Morning Rhythm Playlist | 1 min ago |
| Jabal Amman | Main Floor | BC-JAM-01 | Online | Afternoon Lift Playlist | 4 min ago |
| Dabouq | Main Floor | BC-DBQ-01 | Online | Calm Focus Playlist | 2 min ago |
| Irbid | Main Floor | BC-IRB-01 | Online | Morning Rhythm Playlist | 2 min ago |
| Irbid | Terrace | BC-IRB-02 | Online | Afternoon Lift Playlist | 5 min ago |
| Abdoun | Main Floor | BC-ABD-02 | Online | Morning Rhythm Playlist | 1 min ago |

## Content & Playlists
| Playlist | Status | Usage |
|---|---|---|
| Morning Rhythm Playlist | Approved | 4 zones |
| Calm Focus Playlist | Approved | 2 zones |
| Afternoon Lift Playlist | Approved | 2 zones |
| Evening Wind Down Playlist | Draft | Not scheduled |

## Campaigns
| Campaign | Status | Date range | Target | Schedule state |
|---|---|---|---|---|
| Autumn Iced Latte | Active | 20–30 Sep 2026 | 4 locations / 6 zones | Scheduled |
| Weekend Brunch Reminder | Ready to schedule | 27–29 Sep 2026 | 2 locations / 3 zones | Not scheduled |
| New Terrace Opening | Draft | Not set | Not set | Not scheduled |

## Network Health Metrics
| Metric | Value | Supporting copy |
|---|---:|---|
| Active locations | 6 of 6 | All locations configured |
| Players online | 9 of 10 | One requires attention |
| Active campaigns | 2 | One starts tomorrow |
| Playback coverage | 96% | Last 7 days, simulated |

## Alert Data
| Priority | Location / Zone | Problem | Next action |
|---|---|---|---|
| High | Sweifieh / Main Floor | Player is offline. Last seen 18 min ago. | View player |
| Medium | Abdali / Terrace | No player paired to this zone. | Pair player |

## Activity Timeline
| Time | Event |
|---|---|
| 12 min ago | Amina Khalil created Weekend Brunch Reminder. |
| 18 min ago | Sweifieh Main Floor Player reported offline. |
| 1 hr ago | Operations updated Abdali Main Floor schedule. |
| Yesterday | Terrace Zone was added to Abdali. |
| Yesterday | Morning Rhythm Playlist was updated. |

## Copy Library
| Use | Copy |
|---|---|
| Network panel label | Live network |
| Network panel message | 9 players are online across 6 locations. |
| Attention card title | Needs attention |
| All-clear message | All locations are operating normally. |
| No locations title | Start with your first location. |
| No locations body | Add a location, set up an audio zone, then pair a player. |
| Error title | We could not load the latest network status. |
| Error body | Your saved configuration is not affected. |
| Branch page title | My location |
| Branch issue action | Report an issue |
