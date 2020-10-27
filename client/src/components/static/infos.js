import React from 'react';
import { Link } from 'react-router-dom';



const places =[
    {
        
        title: 'HEALTHY EATING',
        desc: "Eat Healthy, Stay Healthy.",
        imageUrl: process.env.PUBLIC_URL + "/images/healthyfood.jpg",
        link: "https://www.helpguide.org/articles/healthy-eating/healthy-eating.htm"
    },
    {
        title:'YOGA AND PEACE',
        desc: "Yoga for Peace and Health",
        imageUrl: process.env.PUBLIC_URL + "/images/yoga.jpg",
        link:"https://www.webmd.com/balance/guide/the-health-benefits-of-yoga"
    },
    {
        title:'MOTHER & BABY',
        desc: "Tips to keep your baby healthy",
        imageUrl: process.env.PUBLIC_URL + "/images/baby.jpg",
        link:"https://www.thehealthsite.com/parenting/baby-care/19-baby-care-tips-for-every-new-mum-149338/"
    },
    {
        title:'COVID-19 UPDATE',
        desc: "Live COVID-19 Updates",
        imageUrl: process.env.PUBLIC_URL + "/images/covid.jpg",
        link: "https://www.google.com/search?q=coronavirus&hl=en-GB&sa=X&ved=2ahUKEwikz57j-9TsAhUChUsFHSENBmIQj-8FegQIARAX#wptab=s:H4sIAAAAAAAAAONgVuLVT9c3NMwySk6OL8zJecTozS3w8sc9YSmnSWtOXmO04eIKzsgvd80rySypFNLjYoOyVLgEpVB1ajBI8XOhCvHsYuL2SE3MKckILkksKV7EKpicX5Sfl1iWWVRarFAMEgMAoubRkIEAAAA"
    },
    
];
export default places;
