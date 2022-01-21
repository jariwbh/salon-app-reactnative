import AsyncStorage from "@react-native-community/async-storage";
import { AUTHUSERBRANCH } from "../../context/actions/key";

export const getBranchDetails = async () => {
    var getUserBranch = await AsyncStorage.getItem(AUTHUSERBRANCH);
    var BranchData = JSON.parse(getUserBranch);
    return BranchData;
}