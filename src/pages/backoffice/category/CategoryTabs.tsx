import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Categories from './Categories';
import Subcategories from '@backoffice/category/subcategory/Subcategory';
import MobXContext from '@stores/MobXContext';
import { useContext } from 'react';
import Products from '@backoffice/product/Products';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  
function Props(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const CategoryTabs = () => {
    const { languageStore } = useContext(MobXContext);
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    };

    return (
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Category Tab panel">
            <Tab label={languageStore.currentLanguage.CategoriesTabText} {...Props(0)} />
            <Tab label={languageStore.currentLanguage.SubCategoriesTabText} {...Props(1)} />
            <Tab label={languageStore.currentLanguage.ProductTabText} {...Props(2)} />
        </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            {/* <Categories /> */}
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Subcategories />
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Products />
        </TabPanel>
    </Box>
    );
}

export default CategoryTabs;