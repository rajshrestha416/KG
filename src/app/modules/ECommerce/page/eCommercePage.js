import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CategoryPage, UserPage } from "./categories/categories";
import { LayoutSplashScreen,ContentRoute } from "../../../../_metronic/layout";
import { ProductPage, VehiclePage } from "./product/product";
import { SubcategoryPage } from "./subcategories/SubCategories";
import { Subcategory1Page } from "./subcategories1/SubCategories1";
import { RolePage } from "./role/role";



export default function eCommercePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect
            exact={true}
            from="/e-commerce"
            to="/e-commerce/customers"
          />
        }
        <ContentRoute path="/e-commerce/categories" component={CategoryPage} />
        <ContentRoute path="/e-commerce/products" component={ProductPage} />
        <ContentRoute path="/e-commerce/roles" component={RolePage} />
        <ContentRoute path="/e-commerce/subcategories" component={SubcategoryPage} />
        <ContentRoute path="/e-commerce/subcategories1" component={Subcategory1Page} />
      </Switch>
    </Suspense>
  );
}
