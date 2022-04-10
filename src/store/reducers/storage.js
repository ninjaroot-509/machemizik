import { storage as storageState } from '../states';
import { DISPATCHES } from '../../constants';

const storage = (state = storageState, { type, payload }) => {
	switch (type) {
		case DISPATCHES.STORAGE:
			const config = {
				favourites: 'current',
				songs: 'current',
				albums: 'current',
				mysongs: 'current',
				myalbums: 'current',
				mydownloads: 'current',
				recommends: 'current',
				populars: 'current',
				recents: 'current',
				playlists: 'current',
				user: 'current',
				...payload,
			};

			return {
				...state,
				favourites: config?.favourites === 'current' ? state?.favourites : payload?.favourites,
				songs: config?.songs === 'current' ? state?.songs : payload?.songs,
				albums: config?.albums === 'current' ? state?.albums : payload?.albums,
				mysongs: config?.mysongs === 'current' ? state?.mysongs : payload?.mysongs,
				myalbums: config?.myalbums === 'current' ? state?.myalbums : payload?.myalbums,
				mydownloads: config?.mydownloads === 'current' ? state?.mydownloads : payload?.mydownloads,
				recommends: config?.recommends === 'current' ? state?.recommends : payload?.recommends,
				populars: config?.populars === 'current' ? state?.populars : payload?.populars,
				recents: config?.recents === 'current' ? state?.recents : payload?.recents,
				playlists: config?.playlists === 'current' ? state?.playlists : payload?.playlists,
				user: config?.user === 'current' ? state?.user : payload?.user,
			};

		default:
			return state;
	}
};

export default storage;
