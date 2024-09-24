import { Button, Icon, Menu, MenuItem, MenuMenu, Container, Image, Placeholder, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import "./Home.css"

export default function Home() {
  let [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    console.log(activeTab)
  }, [activeTab])

  return (
    <div className="App">
      <Container>
        <Header currentTab="home" />
        <Grid columns={"equal"}>
          <GridRow>
            <GridColumn verticalAlign='middle'>
              <Button icon="angle left" floated='right'></Button>
            </GridColumn>
            <GridColumn width={8}>
              <Image rounded fluid size='big' centered src="https://www.schemecolor.com/wallpaper?i=59774&desktop"></Image>
            </GridColumn>
            <GridColumn verticalAlign='middle'>
              <Button icon="angle right" floated='left'></Button>
            </GridColumn>
          </GridRow>
        </Grid>
        <br />

      </Container>
    </div>

  );
}

