import React from 'react';
import { Link } from 'react-router-dom';
import ProgressSpinner from './../../../shared/spinner/spinner';
import RestaurantService from './../../../services/restaurant-service';
export default class RestaurantDetails extends React.Component {
  state = { loading: true };
  componentDidMount() {
    RestaurantService.getRestaurantDetails(this.props.match.params.id).then(
      res => {
        this.setState({ loading: false, restaurantDetails: res.result });
      },
      err => this.setState({ loading: false })
    );
  }
  getMenuData() {
    return this.state?.restaurantDetails?.menus?.length ? (
      <>
                        
        {this.state?.restaurantDetails?.menus?.map((data, dataIndex) => {
          return (
            <div key={dataIndex} className="menu-data">
                                          
              <div className="menu-header">
                                                {data.menu_name}
                                            
              </div>
                                          
              {data?.menu_sections.length &&
                data?.menu_sections.map((subMenu, subMenuIndex) => {
                  return (
                    <div key={subMenuIndex} className="sub-menu">
                                                          
                      <h3 className="submenu-name">{subMenu?.section_name}</h3>
                                                          
                      {subMenu?.menu_items?.length &&
                        subMenu?.menu_items.map((menu, menuIndex) => {
                          return (
                            <div key={menuIndex} className="items">
                                                                              
                              <p>
                                <span className="items-name">{menu?.name}</span>
                                <span className="items-cost">
                                  {menu?.pricing[0]?.priceString}
                                </span>
                              </p>
                                                                          
                            </div>
                          );
                        })}
                                                      
                    </div>
                  );
                })}
                                      
            </div>
          );
        })}
                    
      </>
    ) : (
      'No Menus'
    );
  }
  render() {
    return !this.state?.loading ? (
      <div className="restaurant-details">
                            <Link to="/">Home </Link>
        <span style={{ margin: '0px 10px' }}>/ </span> 
        <span style={{ color: 'darkgray' }}>
          {this.state?.restaurantDetails?.restaurant_name}
        </span>
                            
        <div className="details-header">
                                  
          <h1>{this.state?.restaurantDetails?.restaurant_name}</h1>
                                  
          <p>{this.state?.restaurantDetails?.address?.formatted}</p>
                                  <h3>Cuisines</h3>                        
          <p>
                                        
            {this.state?.restaurantDetails?.cuisines?.length &&
              this.state?.restaurantDetails.cuisines.map(data => (
                <span className="cuisines">{data}</span>
              ))}
                                    
          </p>
                              
        </div>
                            <h2>Menu</h2>                    
        {this.getMenuData()}                
      </div>
    ) : (
      <ProgressSpinner />
    );
  }
}
