import store from "../../../tf_reports";
import { saveFavoriteLinks} from "../../home/favoriteLinksActions";
import favoriteLinksAPI from "../../home/actions/favoriteLinksAPI";
const moduleid = 1;
export function setUnSetFavorite(favorites, selectedFavorite, action) {
    if(action==1){
      const favorite = favorites.filter(option => option.id == selectedFavorite.id);
      let favorit = favorite && favorite[0] ? favorite[0]:[];
      if(favorit){
        store.dispatch(saveFavoriteLinks(favorites));
        favoriteLinksAPI.addToFavoriteLinks(appUserId(),favorit.linkid,moduleid).then(addStatus => {
          //console.log(addStatus);
        });
      }
    }else if(action==0){
      let favorite = selectedFavorite && selectedFavorite[0] ? selectedFavorite[0]:[];
      if(favorite){
        store.dispatch(saveFavoriteLinks(favorites));
        favoriteLinksAPI.deleteFavoriteLink(appUserId(),favorite.linkid,moduleid).then(deleteStatus => {
          //console.log(deleteStatus);
        });
      }
    }
  }