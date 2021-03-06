import * as React from 'react';

import { View, Text,Image,StyleSheet, SafeAreaView, TouchableOpacity
  ,TextInput
  ,FlatList,
  ScrollView} from 'react-native'

 import COLORS from './constants/Colors';

 
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initalList:[],
      enterAmount:'', 
      finalList:[],
      totalInvested:0.0,
      totalProfit:0.9 
    };
   
  }
  
  //this is ny sanjib hjfj

  //this is sanjib demo

 componentDidMount(){
    this.setState({
      initalList: [ 
      {shareName: 'L&T',Buy:100.00,Sell:112.00},
      {shareName: 'NHPC',Buy:25.60,Sell:28.80},
      {shareName: 'SBICard',Buy:80.00,Sell:85.40},
      {shareName: 'Appollo',Buy:250.00,Sell:195.00},
      {shareName: 'Edelweiss',Buy:290.24,Sell:62.80},
      {shareName: 'ITC',Buy:153.95,Sell:244.94},
      {shareName: 'TCS',Buy:456.00,Sell:561.00},
      {shareName: 'CEAT',Buy:200.00,Sell:205.44},
      {shareName: 'HDFCBank',Buy:806.00,Sell:1008.50},
      {shareName: 'PowerGrid',Buy:190.00,Sell:565.45},
      {shareName: 'AxisBank',Buy:30.50,Sell:80.54},
      {shareName: 'BajajFinsv',Buy:31.60,Sell:81.65},
      {shareName: 'CIPLA',Buy:140.00,Sell:157.45},
      {shareName: 'EKC',Buy:80.50,Sell:88.50},
      {shareName: 'EMCO',Buy:25.60,Sell:0.45},
      ]})
  }


  checkEnterAmount = ()=> {
   const x = Number(this.state.enterAmount)

   var filterList =[]

   this.state.initalList.filter(item => item.Buy <= x).map(fliterItem => (
    filterList.push(fliterItem)
  ))

  console.log('filteredList'+JSON.stringify(filterList));
 
  //buy initial list sorting
  const buyFiltered = [...filterList].sort((a, b) => {
    return ( (a.Buy) -(b.Buy) );
  });

  console.log('Buysorted'+JSON.stringify(buyFiltered));


  //enter amount not added greater than buying value
  var lastList = []
  var checkValueBuy = 0.0
  for (let index = 0; index < buyFiltered.length; index++) {
    checkValueBuy = checkValueBuy+buyFiltered[index].Buy
       if(checkValueBuy <= x){
         lastList.push(buyFiltered[index])
       }
       
  }



 
//final soted list to show profit in increasing mode
  const sorted = [...lastList].sort((a, b) => {
    return ((b.Sell-b.Buy) - (a.Sell-a.Buy));
  });


 
  this.setState({finalList:sorted})
  //console.log(filterList);

  var totalInvestedVal = 0.0
  var totalProfitVal = 0.0

   for (let index = 0; index < sorted.length; index++) {
     
     totalInvestedVal = totalInvestedVal+sorted[index].Buy
     totalProfitVal =totalProfitVal +(sorted[index].Sell - sorted[index].Buy)
   }
  this.setState({totalInvested:(Math.round(totalInvestedVal * 100) / 100).toFixed(2)
    ,totalProfit:totalProfitVal})
 
  }


  renderHeaderFlatList = () => {
 
    var header_View = (
 
    <View style={{flexDirection:'row'}}>
 
 <Text style={{padding:10,fontSize:14,alignSelf:'flex-start',flex:1,fontWeight:'bold'}}>{'Share'}</Text> 
 <Text style={{padding:10,fontSize:14,alignSelf:'flex-start',flex:1,fontWeight:'bold'}}>{'Buy'}</Text> 
 <Text style={{padding:10,fontSize:14,alignSelf:'flex-start',flex:1,fontWeight:'bold'}}>{'Sell'}</Text> 
 <Text style={{padding:10,fontSize:14,alignSelf:'flex-start',flex:1,fontWeight:'bold'}}>{'Profit'}</Text> 
 
    </View>
 
    );
 
    return header_View ;
 
  };


  render() {
    return (
      <ScrollView >
        
          <Text style={{textAlign:'center',color:'blue',fontSize:20,margin:15}}>Maximum Profit</Text>

          <View style={{flexDirection:'row'}}>
          <Text style={{alignSelf:'center',flex:1,marginStart:10,fontSize:16}}>Amount : </Text>

          <TextInput
            style={styles.inputStyle}
            ref={input => { this.email = input }}
            underlineColorAndroid = "transparent"
            placeholder = ""
            placeholderTextColor = {COLORS.blueGrey}
            autoCapitalize = "none"
            keyboardType ='number-pad'
            returnKeyType = { "done" }
            onChangeText={(text) => this.setState({enterAmount:text})}
          />

          </View>

          <TouchableOpacity
                 style = {styles.submitButton}
               onPress={this.checkEnterAmount}
                 
                >
                 <Text style = {styles.submitButtonText}> CALCULATE </Text>
              </TouchableOpacity>    
      
      
       {this.state.finalList.length > 0

       ?
        
        <View>
            
            <Text style={{fontSize:16,marginStart:20,fontWeight:'bold',marginTop:10}}>{'Invested Share'}</Text>
       
        <FlatList style=
           {{margin:20}}  
           data= {this.state.finalList} 
        
           renderItem={({item}) =>
            
           <View style={styles.subView}>
     
               <View style={{flexDirection:'row',flex:1}}>
               <Text style={{padding:10,fontSize:14,alignSelf:'flex-start',flex:1}}>{item.shareName}</Text> 
               <Text  style={{padding:10,fontSize:14,flex:1}}>{item.Buy}</Text> 
               <Text  style={{padding:10,fontSize:14,alignSelf:'flex-end',flex:1}}>{item.Sell}</Text> 
               <Text  style={{padding:10,fontSize:14,alignSelf:'flex-end',flex:1}}>{(item.Sell-item.Buy).toFixed(2)}</Text> 
              
               </View>
                     </View>
                        }  

              ListHeaderComponent={this.renderHeaderFlatList}

                    
          //  ItemSeparatorComponent={this.renderSeparator}  
           
       />


             <View style={{marginStart:20,fontSize:16}}>

                  <Text>{'Total Invested : ' + this.state.totalInvested}</Text>
                  <Text>{'Total Profit : '+ this.state.totalProfit}</Text>


             </View>
               

               </View>  
               
               : null
               
               }

          </ScrollView>
           );
         }
    }


    const styles = StyleSheet.create({
   
      container: {
        flex:1,
          backgroundColor:COLORS.white  
      },
    
      inputStyle:{
        height:50,
         borderColor: COLORS.lightGrey, 
         borderWidth: 2, 
         borderRadius: 12,marginEnd:30,
           fontSize: 14,
           flex:3,
           alignSelf:'center'
      },
    
    
    boldTextstyle:{
      color: COLORS.dark,
      fontSize:26,
      fontFamily:'../assets/fonts/segoeuili.ttf',
      fontWeight:'bold',
      fontFamily:'segoeuisb',
      marginStart:30,
      marginTop:90,
    
    },
    
    smallTextstyle:{
      color: COLORS.dark,
      fontSize:14,
      fontWeight:'bold',
      marginStart:30,
      marginEnd:20,
      marginTop:10,
      marginBottom:40
    },
      
      SectionStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginStart:20,
        marginEnd:20
      },
    
    
      
      submitButton: {
        backgroundColor: COLORS.greyColor,
        margin:20,
        height: 50,
        width:"45%",
        borderRadius:8,
        alignSelf:"center",
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:COLORS.black,
        borderWidth:2
         
     },
     submitButtonText:{
        color: COLORS.white,
        fontSize:15,
      
        fontWeight:'bold',
      
     },
     
    
    });

