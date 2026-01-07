import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
  useNavigate,
  useParams,
} from '@tanstack/react-router'
import { campaigns, getCampaign } from './game/campaigns'
import { HomeScreen } from './ui/screens/home-screen'
import { GameScreen } from './ui/screens/game-screen'

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <div className="h-full max-w-md mx-auto bg-[--color-surface]">
      <Outlet />
    </div>
  ),
})

// Home route
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomeRouteComponent,
})

function HomeRouteComponent() {
  const navigate = useNavigate()

  return (
    <HomeScreen
      campaigns={campaigns}
      onSelectCampaign={(campaign) =>
        navigate({ to: '/play/$campaignId', params: { campaignId: campaign.id } })
      }
    />
  )
}

// Game route
const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/play/$campaignId',
  component: GameRouteComponent,
})

function GameRouteComponent() {
  const { campaignId } = useParams({ from: '/play/$campaignId' })
  const navigate = useNavigate()
  const campaign = getCampaign(campaignId)

  if (!campaign) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[--color-text-secondary]">Campaign not found</div>
      </div>
    )
  }

  return <GameScreen campaign={campaign} onBack={() => navigate({ to: '/' })} />
}

// Create route tree
const routeTree = rootRoute.addChildren([homeRoute, gameRoute])

// Create router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

// Type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
