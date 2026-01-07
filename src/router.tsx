import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  useNavigate,
  useParams,
} from '@tanstack/react-router'
import { campaigns, getCampaign } from './game/campaigns'
import { GameScreen } from './ui/screens/game-screen'
import { HomeScreen } from './ui/screens/home-screen'

const hashHistory = createHashHistory()

const rootRoute = createRootRoute({
  component: () => (
    <div className="h-full max-w-md mx-auto bg-[--color-surface]">
      <Outlet />
    </div>
  ),
})

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
        navigate({
          to: '/play/$campaignId',
          params: { campaignId: campaign.id },
        })
      }
    />
  )
}

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

const routeTree = rootRoute.addChildren([homeRoute, gameRoute])

export const router = createRouter({
  routeTree,
  history: hashHistory,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
