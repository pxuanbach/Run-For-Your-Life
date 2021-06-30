import React, {useState} from 'react';
import {
    Text, View, ScrollView, Dimensions, 
    StyleSheet, SafeAreaView, FlatList
} from 'react-native';
import Constants from '../../../utilities/Constants';
import FontLoader from '../../../utilities/Font';
import PlanRecommendedCard from '../../../components/PlanRecommendedCard';
import ListPlanCard from '../../../components/ListPlanCard';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var listPlan = [
    {
        _id: '1',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/chay4tuan1_6kmnewbie.png?alt=media&token=f57144ce-00f5-42f0-a1f1-d50144d10ce1',
        title: 'Training run 1.6km no rest in 4-Weeks',
        webUrl: 'https://irace.vn/giao-an-chay-1-6km-trong-4-tuan/'
    },
    {
        _id: '2',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/summer-running-1597413181.jpg?alt=media&token=f6bd39db-0484-4d6c-9652-53c0c3c30f1f',
        title: 'Training run 3km no rest in 4-Weeks',
        webUrl: 'https://irace.vn/giao-an-chay-3-2km-trong-4-tuan/'
    },
    {
        _id: '3',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/4-Week%205K%20Training%20Plan%20for%20Beginners.png?alt=media&token=49176534-2765-47ef-abc8-10c62042af45',
        title: '6-Weeks 5K Training Plan',
        webUrl: 'https://irace.vn/giao-trinh-chay-bo-5k-trong-6-tuan-cho-nguoi-moi-bat-dau-tap-chay/'
    },
    {
        _id: '4',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/8-Weeks%2010K%20Training%20Plan.png?alt=media&token=82f00d85-d52c-453b-b92d-c86214f7cfb7',
        title: '8-Weeks 10K Training Plan',
        webUrl: 'https://irace.vn/giao-an-chay-bo-chinh-phuc-cu-ly-10k-cho-nguoi-moi/'
    },
    {
        _id: '5',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/21k10weeks.png?alt=media&token=ef1dca2c-e206-4948-9766-707a64f62544',
        title: '10-Weeks 21K Training Plan',
        webUrl: 'https://irace.vn/chinh-phuc-cu-ly-21k-voi-lich-tap-chay-bo-trong-10-tuan/'
    },
    {
        _id: '6',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/Chinh%20Ph%E1%BB%A5c%20M%E1%BB%99t%20Gi%E1%BA%A3i%20Full%20Marathon.png?alt=media&token=44f024c7-0250-4a62-95ef-75490628cd23',
        title: '10-Weeks 42K Training Plan (Conquer a Full Marathon)',
        webUrl: 'https://irace.vn/giao-an-chay-bo-42k-giup-ban-chinh-phuc-mot-giai-full-marathon-trong-10-tuan/'
    },
    {
        _id: '7',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/11%20B%C3%A0i%20T%E1%BA%ADp%20Ph%E1%BB%A5c%20H%E1%BB%93i%20T%C3%ADch%20C%E1%BB%B1c%20Cho%20B%E1%BA%A1n%20V%C3%A0o%20Ng%C3%A0y%20Ngh%E1%BB%89.png?alt=media&token=78ae1021-e05b-4800-ab72-6e544fdf931f',
        title: '11 Active Recovery Exercises For You On Your Day Off',
        webUrl: 'https://irace.vn/11-bai-tap-phuc-hoi-tich-cuc-cho-ban-vao-ngay-nghi/'
    },
    {
        _id: '8',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/Walkactive.png?alt=media&token=33b53656-c3f3-4aef-9530-37996747c262',
        title: 'The Walkactive Method burns 1000 calories',
        webUrl: 'https://irace.vn/huong-dan-di-bo-giam-can-dot-mo-theo-phuong-phap-walkactive/'
    }
]

var listKnowledge = [
    {
        _id: '1',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/Ti%E1%BA%BFp%20T%E1%BB%A5c%20Ch%E1%BA%A1y%20B%E1%BB%99%20Khi%20B%E1%BA%A1n%20B%E1%BA%AFt%20%C4%90%E1%BA%A7u%20L%C3%A3o%20H%C3%B3a.png?alt=media&token=558e9589-ad91-488b-9cb6-d2a9fa2356ca',
        title: 'How To Keep Running When You Start Aging?',
        webUrl: 'https://irace.vn/lam-the-nao-de-tiep-tuc-chay-bo-khi-ban-bat-dau-lao-hoa/'
    },
    {
        _id: '2',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/%C6%AFu%20V%C3%A0%20Nh%C6%B0%E1%BB%A3c%20%C4%90i%E1%BB%83m%20C%E1%BB%A7a%20Chu%20K%E1%BB%B3%20T%E1%BA%ADp%20Luy%E1%BB%87n%2010%20Ng%C3%A0y.png?alt=media&token=3e26f990-03a8-44c8-8f7f-d2d41c1b0e76',
        title: 'The Pros And Cons Of The 10 Day Workout Cycle',
        webUrl: 'https://irace.vn/uu-va-nhuoc-diem-cua-chu-ky-tap-luyen-10-ngay/'
    },
    {
        _id: '3',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/Ch%E1%BA%A1y%20V%C3%A0%20%C4%90i%20B%E1%BB%99%20Tr%C3%AAn%20M%C3%A1y%20Cho%20Ng%C6%B0%E1%BB%9Di%20M%E1%BB%9Bi%20B%E1%BA%AFt%20%C4%90%E1%BA%A7u.png?alt=media&token=90b4ff1e-9610-4106-9b81-2923249cf9f6',
        title: 'A Beginner\'s Guide to Running and Walking on Machines',
        webUrl: 'https://irace.vn/huong-dan-chay-va-di-bo-tren-may-cho-nguoi-moi-bat-dau/'
    },
    {
        _id: '4',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/Kinh%20Nghi%E1%BB%87m%20Chu%E1%BA%A9n%20B%E1%BB%8B%20Tr%C6%B0%E1%BB%9Bc%20Cho%20Cu%E1%BB%99c%20%C4%90ua%20Marathon.png?alt=media&token=969f5ddf-984d-47c5-9ddf-45e3c5e5908c',
        title: 'Marathon Preparation Experience',
        webUrl: 'https://irace.vn/kinh-nghiem-chuan-bi-truoc-cho-cuoc-dua-marathon/'
    },
]

var listComplementaryActivities = [
    {
        _id: '1',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/3%20%C4%90%E1%BB%99ng%20T%C3%A1c%20Kh%E1%BB%9Fi%20%C4%90%E1%BB%99ng%20Tr%C6%B0%E1%BB%9Bc%20Khi%20Ch%E1%BA%A1y%20B%E1%BB%99%20Tr%C3%A1nh%20T%C3%ACnh%20Tr%E1%BA%A1ng%20Chu%E1%BB%99t%20R%C3%BAt.png?alt=media&token=fcbe808f-4a6e-4da0-af82-73e0b4c37f4f',
        title: '3 Warm-Up Moves Before Running to Avoid Cramps',
        webUrl: 'https://irace.vn/3-dong-tac-khoi-dong-truoc-khi-chay-bo-tranh-tinh-trang-chuot-rut/'
    },
    {
        _id: '2',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/Cross%20Training%20Trong%20Luy%E1%BB%87n%20T%E1%BA%ADp%20Ch%E1%BA%A1y%20B%E1%BB%99.png?alt=media&token=464f5937-cd5b-46b2-9ce9-6b05c1e05c91',
        title: 'Cross Training In Running Training',
        webUrl: 'https://irace.vn/loi-ich-khi-ap-dung-cross-training-trong-luyen-tap-chay-bo/'
    },
    {
        _id: '3',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/H%C6%B0%E1%BB%9Bng%20D%E1%BA%ABn%20Th%E1%BB%B1c%20Hi%E1%BB%87n%20Gi%C3%A3n%20C%C6%A1%20Sau%20Khi%20Ch%E1%BA%A1y%20B%E1%BB%99%20%C4%90%E1%BB%83%20Ph%E1%BB%A5c%20H%E1%BB%93i%20Nhanh%20H%C6%A1n.png?alt=media&token=78fb80ea-5959-4bda-a3e8-d489a264a29c',
        title: 'A Guide To Stretching After Running For Faster Recovery',
        webUrl: 'https://irace.vn/gian-co-sau-khi-chay-bo/'
    }
]

var listInjuryRecovery = [
    {
        _id: '1',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/R%20I%20C%20E%20Ph%C6%B0%C6%A1ng%20Ph%C3%A1p%20S%C6%A1%20C%E1%BB%A9u%20Ch%E1%BA%A5n%20Th%C6%B0%C6%A1ng%20Hi%E1%BB%87u%20Qu%E1%BA%A3.png?alt=media&token=6f0142a8-c83f-4f3f-8a25-edcdba21d3aa',
        title: 'R I C E Effective First Aid Method for Injury',
        webUrl: 'https://irace.vn/r-i-c-e-phuong-phap-so-cuu-chan-thuong-hieu-qua/'
    },
    {
        _id: '2',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/chatappflutter-b38e5.appspot.com/o/%C4%90au%20H%C3%B4ng%20Sau%20Khi%20Ch%E1%BA%A1y%20B%E1%BB%99.png?alt=media&token=d94376da-7c84-466b-a04e-a3f3fd0dce43',
        title: 'Hip Pain After Running: Causes, Pain Relief & Prevention',
        webUrl: 'https://irace.vn/dau-hong-sau-khi-chay-bo-nguyen-nhan-cach-giam-dau-phong-ngua/'
    }
]

function PlansTab({navigation}) {
    return (
        <SafeAreaView style={{height: '100%'}}>
            <ScrollView>
                {/*  */}
                <View style={{
                    height: windowHeight/10,
                    margin: 12,
                    backgroundColor: Constants.COLOR.white,
                    borderRadius: 16,
                    marginTop: windowHeight/24,
                    elevation: 6
                }}>
                    <FontLoader>
                        <Text style={{
                            fontFamily: 'SemiBold',
                            fontSize: windowHeight/24,
                            color: Constants.COLOR.dark_green,
                            paddingHorizontal: 12, 
                        }}>
                            All Plans
                        </Text>
                        <Text style={{
                            fontFamily: 'RobotoRegular',
                            fontSize: windowHeight/38,
                            color: Constants.COLOR.second_green,
                            paddingHorizontal: 12, 
                        }}>
                            Choose the plan that's fit for you
                        </Text>
                    </FontLoader>
                </View>
                {/* Tag + List plan */}
                <ListPlanCard
                title="Plans"
                datas={listPlan}
                navigation={navigation}/>
                <ListPlanCard
                title="Knowledge"
                datas={listKnowledge}
                navigation={navigation}/>
                <ListPlanCard
                title="Complementary Activities"
                datas={listComplementaryActivities}
                navigation={navigation}/>
                <ListPlanCard
                title="Injury Recovery"
                datas={listInjuryRecovery}
                navigation={navigation}/>
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default PlansTab

const styles=StyleSheet.create({
    
})
