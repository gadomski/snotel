import { Box, IconButton, VStack, Tooltip } from '@chakra-ui/react'
import { FiZoomIn, FiZoomOut, FiMaximize } from 'react-icons/fi'
import { useMapStore } from '@/store/useMapStore'
import { INITIAL_VIEW_STATE } from '@/lib/mapConfig'

export default function MapControls() {
  const { viewState, setViewState } = useMapStore()

  const handleZoomIn = () => {
    setViewState({ zoom: (viewState.zoom || 0) + 1 })
  }

  const handleZoomOut = () => {
    setViewState({ zoom: (viewState.zoom || 0) - 1 })
  }

  const handleResetView = () => {
    setViewState(INITIAL_VIEW_STATE)
  }

  return (
    <Box position="absolute" top={4} right={4} zIndex={1}>
      <VStack spacing={2}>
        <Tooltip label="Zoom In" placement="left">
          <IconButton
            aria-label="Zoom in"
            icon={<FiZoomIn />}
            onClick={handleZoomIn}
            size="sm"
            colorScheme="blue"
          />
        </Tooltip>
        <Tooltip label="Zoom Out" placement="left">
          <IconButton
            aria-label="Zoom out"
            icon={<FiZoomOut />}
            onClick={handleZoomOut}
            size="sm"
            colorScheme="blue"
          />
        </Tooltip>
        <Tooltip label="Reset View" placement="left">
          <IconButton
            aria-label="Reset view"
            icon={<FiMaximize />}
            onClick={handleResetView}
            size="sm"
            colorScheme="blue"
          />
        </Tooltip>
      </VStack>
    </Box>
  )
}
