const INITIAL_STATE = {
    lieferdiensteOnsListData: [
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Pinocchio Pizzawerkstatt',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'ulm-isst.de/',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Hungry Turtle',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Triple Lieferservice',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Eismann',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Vorglühbar Ulm',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Mudita Bar',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Buddha Kitchen',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Ahi´s Pizza',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Hemperium',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Burger Brothers Ulm',
            subtitle: ''
        },
    ]
};

const app = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default app;