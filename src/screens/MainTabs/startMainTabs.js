import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource('md-map', 30),
        Icon.getImageSource('md-share-alt', 30),
        Icon.getImageSource('md-menu', 30)
    ]).then((sources) => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: 'awesome-places.FindPlaceScreen',
                    label: 'Find Place',
                    title: 'Find Place',
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: 'Menu',
                                id: 'sideDrawerToggle'
                            }
                        ]
                    }
                },
                {
                    screen: 'awesome-places.SharePlaceScreen',
                    label: 'Share Place',
                    title: 'Share Place',
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: 'Menu',
                                id: 'sideDrawerToggle'
                            }
                        ]
                    }
                }
            ],
            navigatorStyle: {
            },
            appStyle: {
                tabBarButtonColor: 'white',
                tabBarSelectedButtonColor: '#F3D826',
                tabBarBackgroundColor: '#691f75',
                initialTabIndex: 0,
            },
            drawer: {
                left: {
                    screen: 'awesome-places.SideDrawerScreen'
                }
            }
        });
    });
};

export default startTabs;