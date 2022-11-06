import {useInfiniteQuery} from '@tanstack/react-query';

const getNews = async ({pageParam = 0}) => {
  let page = pageParam ? pageParam : 0;

  const res = await (
    await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=pdiRET3l7Osnyk7IHvSPl0ziiWFCFly1&q=technology&sort=newest&page=${page}`,
    )
  ).json();
  if (res?.status === 'OK') {
    return {
      data: res?.response?.docs,
      nextPage: page + 1,
      isError: false,
    };
  } else {
    throw new Error(res?.fault?.faultstring);
  }
};

export default function useFetchNews() {
  return useInfiniteQuery(['news'], getNews, {
    getNextPageParam: lastPage => {
      if (lastPage?.data?.length < 10) {
        return undefined;
      }

      return lastPage?.nextPage;
    },
  });
}
