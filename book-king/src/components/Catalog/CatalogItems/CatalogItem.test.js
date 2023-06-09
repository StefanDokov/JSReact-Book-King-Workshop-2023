import {render, screen} from "@testing-library/react";
import { CatalogItem } from "./CatalogItem";
import { BrowserRouter } from "react-router-dom";

describe(`Catalog Components`, () => {
   test(`Show title`, () => {
       const title = `Test title`;
       
       render(<BrowserRouter><CatalogItem title={title} /></BrowserRouter>);
       
       expect(screen.getByText(title)).toBeInTheDocument()

   });


});