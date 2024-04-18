import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchSearchCamping = ({ keyword }) => {
   return keyword
      ? api.get(`/searchList?MobileOS=ETC&MobileApp=AppTest&keyword=${encodeURI(keyword)}&_type=json`)
      : api.get(`/basedList?MobileOS=ETC&MobileApp=AppTest&_type=json`)
}

export const useSearchCampingQuery = ({ keyword, page }) => {
   return useQuery({
      queryKey: ['camping-search', { keyword }],
      queryFn: () => fetchSearchCamping({ keyword, page }),
      select: (result) => result.data.response.body.items.item,
   })
}
