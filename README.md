## Stock Inventory - NextJS

Stock Inventory is a ReactJS-based inventory management application designed to help you manage your product stock efficiently. This application includes features such as product listing, adding new products, editing existing products, and filtering products based on various criteria.

_NOTE: This project is still under development and coming up more functionalities and features soon using mongodb, prisma, user validation with jwt, encryption etc_

**Online-Live: **

## Features

- **Product Listing**: View a list of all products with details such as name, SKU, status, quantity in stock, price, and supplier.
- **Add Product**: Add new products to the inventory with details such as name, SKU, status, quantity, price, and supplier.
- **Edit Product**: Edit existing product details.
- **Filter Products**: Filter products based on status and category.
- **Responsive Design**: The application is responsive and works well on devices of various screen sizes, including mobile phones.

## Installation

To get started with Stockly, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/stockly.git
   cd stockly
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Usage

### Adding a New Product

1. Click on the "+Add Product" button.
2. Fill in the product details in the form.
3. Click the "Add Product" button to save the new product.

### Editing an Existing Product

1. Click on the dropdown menu next to the product you want to edit.
2. Select "Edit".
3. Update the product details in the form.
4. Click the "Edit Product" button to save the changes.

### Filtering Products

1. Use the status and category dropdowns to filter products based on their status and category.

## Project Structure

The project structure is organized as follows:

```
stockly
├── app
│   ├── AppHeader
│   │   └── AppHeader.tsx
│   ├── AppTable
│   │   ├── AppTable.tsx
│   │   ├── ProductDialog
│   │   │   ├── ProductDialog.tsx
│   │   │   ├── _components
│   │   │   │   ├── ProductName.tsx
│   │   │   │   ├── Price.tsx
│   │   │   │   ├── ProductCategory.tsx
│   │   │   │   ├── Quantity.tsx
│   │   │   │   ├── SKU.tsx
│   │   │   │   ├── Status.tsx
│   │   │   │   └── Supplier.tsx
│   │   ├── dropdowns
│   │   │   ├── StatusDropDown.tsx
│   │   │   └── CategoryDropDown.tsx
│   ├── DeleteDialog
│   │   └── DeleteDialog.tsx
│   ├── Products
│   │   ├── ProductTable.tsx
│   │   └── columns.tsx
│   ├── authContext.tsx
│   ├── login
│   │   └── page.tsx
│   ├── register
│   │   └── page.tsx
│   ├── page.tsx
├── components
│   └── ui
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── table.tsx
│       └── textarea.tsx
├── public
├── styles
│   └── globals.css
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Components

### AppHeader

The `AppHeader` component is responsible for rendering the header of the application.

### AppTable

The `AppTable` component is responsible for rendering the table of products. It includes sub-components such as `ProductDialog`, `StatusDropDown`, and `CategoryDropDown`.

### ProductDialog

The `ProductDialog` component is responsible for rendering the dialog for adding and editing products. It includes sub-components such as `ProductName`, `Price`, `ProductCategory`, `Quantity`, `SKU`, `Status`, and `Supplier`.

### DeleteDialog

The `DeleteDialog` component is responsible for rendering the dialog for deleting products.

### Products

The `Products` directory contains the `ProductTable` component and the columns.tsx file, which defines the columns of the product table.

### AuthContext

The `authContext.tsx` file contains the authentication context for the application.

### Login and Register

The `login` and `register` directories contain the pages for user login and registration.

### UI Components

The ui directory contains reusable UI components such as `Badge`, `Button`, `Card`, `DropdownMenu`, `Input`, `Label`, `Popover`, `Select`, `Separator`, `Table`, and `Textarea`.

## Responsive Design

The application is designed to be responsive and works well on devices of various screen sizes, including mobile phones. Tailwind CSS is used to apply responsive styles.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create a pull request or open an issue.
