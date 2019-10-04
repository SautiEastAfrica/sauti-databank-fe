import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import theme from "../../Constants/Theme.js";

class ProceduresComCatChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            totalCount: 0,
            data: [],
            keys: [
                "Cereals",
                "Clothing and Shoes",
                "Fruits",
                "Vegetables",
                "Legumes",
                "Livestock and Live Products ",
                "Cosmetics",
                "Poultry, Bees, and Thier Products",
                "Pulses",
                "Fish Products",
                "Tubers"
            ],
            color: "nivo",
            // Percentages
            Cereals_Percentage: 0,
            Clothing_and_shoes_Percentage: 0,
            Fruits_Percentage: 0,
            Vegetables_Percentage: 0,
            Legumes_Percentage: 0,
            Livestock_and_live_Products_Percentage: 0,
            Cosmetics_Percentage: 0,
            Poultry_Bees_and_Thier_Products_Percentage: 0,
            Pulses_Percentage: 0,
            Fish_Products_Percentage: 0,
            Tubers_Percentage: 0,

            //  Count
            Cereals_Count: 0,
            Clothing_and_shoes_Count: 0,
            Fruits_Count: 0,
            Vegetables_Count: 0,
            Legumes_Count: 0,
            Livestock_and_live_Product_Count: 0,
            Cosmetics_Count: 0,
            Poultry_Bees_and_Thier_Products_Count: 0,
            Pulses_Count: 0,
            Fish_Products_Count: 0,
            Tubers_Count: 0
        };
    }

    componentDidMount() {
        this.props.getDropDownDefault(this.props.pathname);

        // Hard work put to backend will change axios calls
        axios.get(`${process.env.REACT_APP_BE_URL}/country/all`).then(res => {
            //console.log('totalCount', res.data.length)
            this.setState(
                {
                    ...this.state,
                    users: res.data,
                    totalCount: res.data.length,
                    Cereals_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "KEN");
                    }, 0),
                    
            Clothing_and_shoes_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "UGA");
                    }, 0),
                    Fruits_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "RWA");
                    }, 0),
                    Vegetables_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "RWA");
                    }, 0),
                    Legumes_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "RWA");
                    }, 0),
                    Livestock_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "RWA");
                    }, 0),
                    Cosmetics_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "UGA");
                    }, 0),
                    Poultry_Bees_and_Thier_Products_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "UGA");
                    }, 0),
                    Pulses_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "UGA");
                    }, 0),
                    Fish_Products_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "UGA");
                    }, 0),
                    Tubers_Count: res.data.reduce(function (n, user) {
                        return n + (user.country_of_residence === "UGA");
                    }, 0),
                },
                () => {
                    this.setPercentages();
                }
            );
        });
    }

    setPercentages = () => {
        const totalCount = this.state.totalCount;
        // let totalCount = dailyCount + weeklyCount + monthlyCount + neverCount;
        let Cereals_Percentage = Math.round(
            (this.state.Cereals_Count / totalCount) * 100
        );
        let 
        Clothing_and_shoes_Percentage = Math.round(
            (this.state.Clothing_and_shoes_Count / totalCount) * 100
        );
        let Fruits_Percentage = Math.round(
            (this.state.Fruits_Count / totalCount) * 100
        ); let Vegetables_Percentage = Math.round(
            (this.state.Vegetables_Count / totalCount) * 100
        ); let Legumes_Percentage = Math.round(
            (this.state.Legumes_Count / totalCount) * 100
        ); let Livestock_and_live_Products_Percentage = Math.round(
            (this.state.Livestock_and_live_Product_Count / totalCount) * 100
        );
        let
            Cosmetics_Percentage = Math.round(
                (this.state.Cosmetics_Count / totalCount) * 100
            ); let Poultry_Bees_and_Thier_Products_Percentage = Math.round(
                (this.state.Poultry_Bees_and_Thier_Products_Count/ totalCount) * 100
            );
        let Pulses_Percentage = Math.round(
            (this.state.Pulses_Count / totalCount) * 100

        ); let Fish_Products_Percentage = Math.round(
            (this.state.Fish_Products_Count / totalCount) * 100
        ); let Tubers_Percentage = Math.round(
            (this.state.Tubers_Count / totalCount) * 100
        );
        this.setState(
            {
                ...this.state,
                Cereals_Percentage: Cereals_Percentage,
                Clothing_and_shoes_Percentage: Clothing_and_shoes_Percentage,
                Fruits_Percentage: Fruits_Percentage,
                Vegetables_Percentage: Vegetables_Percentage,
                Legumes_Percentage: Legumes_Percentage,
                Livestock_and_live_Products_Percentage: Livestock_and_live_Products_Percentage,
                Cosmetics_Percentage: Cosmetics_Percentage,
                Poultry_Bees_and_Thier_Products_Percentage: Poultry_Bees_and_Thier_Products_Percentage,
                Pulses_Percentage: Pulses_Percentage,
                Fish_Products_Percentage: Fish_Products_Percentage,
                Tubers_Percentage: Tubers_Percentage
            },
            () => {
                this.setState({
                    ...this.state,
                    data: [
                        {
                            CommodityCategory: "Cereals",
                            Cereals: this.state.Cereals_Percentage,
                            CerealsColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            CommodityCategory: "Clothing and Shoes",
                            ClothingAndShoes: this.state.Clothing_and_shoes_Percentage,
                            ClothingAndShoesColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            CommodityCategory: "Fruits",
                            Fruits: this.state.Fruits_Percentage,
                            FruitsColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            CommodityCategory: "Vegetables",
                            Vegetables: this.state.Vegetables_Percentage,
                            VegetablesColor: "hsl(65, 70%, 50%)"
                        }, {
                            CommodityCategory: "Legumes",
                            Legumes: this.state.Legumes_Percentage,
                            LegumesColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            CommodityCategory: "Livestock and Live Products",
                            LivestockAndLiveProducts: this.state.Livestock_and_live_Products_Percentage,
                            LivestockAndLiveProductsColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            CommodityCategory: "Cosmetics",
                            Cosmetics: this.state.Cosmetics_Percentage,
                            CosmeticsColor: "hsl(65, 70%, 50%)"
                        }, {
                            CommodityCategory: "Poultry, Bees and Thier Products",
                            PoultryBeesAndThierProducts: this.state.Poultry_Bees_and_Thier_Products_Percentage,
                            PoultryBeesAndThierProductsColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            CommodityCategory: "Pulses",
                            Pulses: this.state.Pulses_Percentage,
                            PulsesColor: "hsl(65, 70%, 50%)"
                        },
                        {
                            CommodityCategory: "Fish Products",
                            FishProducts: this.state.Fish_Products_Percentage,
                            FishProductsColor: "hsl(65, 70%, 50%)"
                        }, {
                            CommodityCategory: "Tubers",
                            Tubers: this.state.Tubers_Percentage,
                            TubersColor: "hsl(65, 70%, 50%)"
                        },
                    ]
                });
            }
        );
    };

    render() {
        return (
            <div className="Chart">
                <h2>Most Requested Procedures for Commodity Categories</h2>
                <ResponsiveBar
                    data={this.state.data} // Data needed
                    keys={this.state.keys} // Values to display in Y axis
                    indexBy="Commodity Categories"
                    margin={{ top: 50, right: 130, bottom: 75, left: 80 }}
                    padding={0.3}
                    groupMode="stacked"
                    colors={{ scheme: this.state.color }}
                    labelFormat={d => <tspan y={-15}>{d}% </tspan>}
                    labelForm={d => <text>{d}% </text>}
                    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                    maxValue={100}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Commodity Categories",
                        legendPosition: "middle",
                        legendOffset: 65
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Percentage of Commodity Categories",
                        legendPosition: "middle",
                        legendOffset: -70
                    }}
                    labelSkipWidth={0}
                    labelSkipHeight={0}
                    labelTextColor="black"
                    theme={theme}
                    tooltip={({ id, value }) => (
                        <strong
                            style={{
                                color: "#000000",
                                fontSize: "15px",
                                fontFamily: "Helvetica"
                            }}
                        >
                            {id}: {value}%
            </strong>
                    )}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
                <div className="lineCont">
                    <div className="lineOne">
                        <h2 className="method-title">Methodology Note</h2>
                    </div>
                    <div className="lineTwo"></div>
                </div>
                <p>
                    It is a long established fact that a reader will be distracted by the
                    readable content of a page when looking at its layout. The point of
                    using Lorem Ipsum is that it has a more-or-less normal distribution of
                    letters, as opposed to using 'Content here, content here', making it
                    look like readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model text, and a
                    search for 'lorem ipsum' will uncover many web sites still in their
                    infancy. Various versions have evolved over the years, sometimes by
                    accident, sometimes on purpose (injected humour and the like).
        </p>
            </div>
        );
    }
}

export default ProceduresComCatChart;
