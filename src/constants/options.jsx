export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A solo traveles in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'👫🏻',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving trip',
        icon:'🏡',
        people:'3 to 5 peoples'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'🏄',
        people:'5 to 15 peoples'
    },
    {
        id: 5,
        title: 'Corporate Group',
        desc: 'A professional team on a retreat',
        icon: '💼',
        people: '6 to 10 people'
    },
    {
        id: 6,
        title: 'School Trip',
        desc: 'A group of students on an educational tour',
        icon: '🎒',
        people: '10 to 20 people'
    },
    {
        id: 7,
        title: 'Extended Family',
        desc: 'A large family gathering for a special occasion',
        icon: '👨‍👩‍👧‍👦',
        people: '6 to 12 people'
    },
    {
        id: 8,
        title: 'Adventure Group',
        desc: 'A team of adventurers ready for an extreme challenge',
        icon: '⛰️',
        people: '5 to 8 people'
    },
    {
        id: 9,
        title: 'Team Building',
        desc: 'A corporate team focusing on building relationships',
        icon: '🏢',
        people: '8 to 15 people'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💸',
    },
    {
        id:2,
        title:'Moderate',
        desc:'A balance of quality and price',
        icon:'💰',
    },
    {

        id:3,
        title:'Luxury',
        desc:'Indulge in the finer things',
        icon:'💵',
    }
]

export const AI_PROMPT='Generate Travel Plan For Location :{location}, for {totalDays} Days for {traveler} with a {budget} budget ,give me Hotels option list with HotelName,Hotel address, Price , Hotel images url,geo coordinates,rating ,description and suggest itinerary with placename,place Details , place Images Url,geo Coordinates,Ticket Pricing,  Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'