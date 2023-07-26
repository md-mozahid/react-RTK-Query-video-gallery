import { useGetRelatedVideosQuery } from '../../../features/api/apiSlice'
import RelatedVideoLoader from '../../ui/loaders/RelatedVideoLoader'
import RelatedVideo from './RelatedVideo'

export default function RelatedVideos({ id, title }) {
  const {
    data: relatedVideos,
    isLoading,
    isError,
  } = useGetRelatedVideosQuery({ id, title })

  let content = null

  if (isLoading) {
    content = (
      <>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </>
    )
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error!" />
  }

  if (!isLoading && !isError && relatedVideos?.length === 0) {
    content = <Error message="No videos found!" />
  }

  if (!isLoading && !isError && relatedVideos?.length > 0) {
    content = relatedVideos.map((relatedVideo) => (
      <RelatedVideo key={relatedVideo.id} relatedVideo={relatedVideo} />
    ))
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  )
}
