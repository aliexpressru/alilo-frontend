import { Flex, Text, Title } from '@mantine/core';
import { Collapse } from '../../components/shared/Collapse';
import styles from './HelpPage.module.css';

const HelpPage = () => (
    <>
      <Flex
          direction="column"
          style={{ paddingLeft: '20%', paddingRight: '20%', paddingTop: '20px' }}
          gap="md"
      >
        <Flex
            w="100%"
            justify="center"
            style={{ paddingTop: '40px', paddingBottom: '10px' }}
        >
          <Title order={1}>Help</Title>
        </Flex>

        <Collapse title="What is a project?" isCollapsed={false}>
          <Text>
            A project is a high-level entity designed for grouping scenarios. Within a project, scenarios can be organized for a team's collaboration or belonging to a specific service.
          </Text>
        </Collapse>

        <Collapse title="What is a scenario?" isCollapsed={false}>
          <Text>
            A scenario is an entity that encompasses a set of scripts. The Alilo system operates with scenarios during load generation, meaning that it is not possible to run an individual script; only scenarios can be executed.
          </Text>
        </Collapse>

        <Collapse title="What is a script?" isCollapsed={false}>
          <Text>
            In the Alilo load testing system, there are two types of scripts: Simple Script and Extended Script. The Simple Script is a set of parameters for the internal Alilo template, based on which a script will be generated. In this variant, there is no need to write code; you only need to specify the required settings. Everything that can be done with cURL will be accomplished using the Simple Script. The Extended Script is an enhanced version of the Simple Script and is a specially prepared script file in JavaScript for K6. It is necessary to use it if you need to preprocess data, make multiple requests, or if the capabilities of the Simple Script are insufficient.
          </Text>
        </Collapse>

        <Collapse title="How to initiate a load test?" isCollapsed={false}>
          <Text>
            To initiate a load test, you need to create a project, then within it, set up a scenario and a script. After creating the script and configuring the necessary settings, click the "RUN" button and choose the percentage of the specified "RPS" (Requests Per Second) with which the load test will be initiated. During the execution, you can adjust the load by increasing or decreasing it.
          </Text>
        </Collapse>
      </Flex>

      <Flex className={styles['footer']} align="center" justify="center" direction="row" gap="xl">
        <Text>© AliLoad, 2025</Text>
      </Flex>
    </>
);

export { HelpPage };
