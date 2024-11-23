import QuartalWidget from "../components/QuartalWidget";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    maxWidth: "1200px",
    width: "auto",
    margin: "auto",
    marginTop: "50px",
    padding: "20px",
  },
});

const WidgetDemo: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <QuartalWidget />
    </div>
  );
};

export default WidgetDemo;
