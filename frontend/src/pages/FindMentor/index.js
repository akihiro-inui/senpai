import React from "react"
import '../../assets/search.css'
import {DataSearch, ReactiveBase, ReactiveList, ResultList, SelectedFilters, SingleRange, RangeSlider, MultiDataList, DateRange} from '@appbaseio/reactivesearch';
import Statement, { GetStartedButton } from "../../components/features/Statement"
import '../../App.css';

const { ResultListWrapper } = ReactiveList;

const FindMentorPage = () => (

    // Wrapper for mentor page
    <div className="main-container">
        <ReactiveBase
            app="users" // Name of index
            url="http://localhost:9200"
            theme={
                {
                    typography: {
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        fontSize: '16px',
                    },
                    colors: {
                        titleColor: '#c7d5e0',
                        textColor: '#c7d5e0',
                        backgroundColor: '#212121',
                        primaryColor: '#CC9900',
                    }
                }
            }
        >
            {/* Search Bar */}
            <DataSearch
                componentId="title"
                dataField={["ResponseName"]}
                queryFormat="and"
                placeholder="search mentor"
                showIcon={false}
                title="Search Mentor"
                className="data-search"
                innerClass={{
                    input: 'input',
                    list: 'list',
                }}
            />

            {/* left-bar */}
            <div className="sub-container">
                <div className="left-bar-optional left-bar">
                    <MultiDataList
                        componentId="multidataLists"
                        dataField="name"                        
                        className="multidata-list" 
                        data={[
                            {
                                label: "mentor1",
                                value: "value"
                            },                        
                            {
                                label: "mentor2",
                                value: "value"
                            }                        
                        ]}
                        innerClass={{
                            label: "list-item",
                            input: "input"
                        }}
                        />                      
                </div>

                {/* Search Result list */}
                <div className="result-container">                                    
                    <ReactiveList
                        defaultQuery={() => ({ track_total_hits: true })}
                        componentId="resultLists"
                        dataField="name"
                        size={25}
                        pagination={true}
                        react={{
                            "and": [
                                "name"
                            ]
                        }}
                        className="result-list"
                        innerClass={{
                            resultsInfo: "resultsInfo",
                            resultStats: "resultStats",
                        }}
                    >
                        
                        {({data}) => (
                            <ResultListWrapper>
                                {
                                    data.map(item => (
                                        <ResultList key={item._id} className="listItem">
                                            <ResultList.Image className="image" src={item.profile_image}/>
                                            <ResultList.Content>
                                                <ResultList.Title
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.name
                                                    }}
                                                />
                                                <ResultList.Description>
                                                <p className="name">{item.comment}</p>
                                                </ResultList.Description>
                                            </ResultList.Content>
                                        </ResultList>
                                    ))
                                }
                            </ResultListWrapper>
                        )}
                    </ReactiveList>
                </div>
            </div>
        </ReactiveBase>
    </div>
)

export default FindMentorPage