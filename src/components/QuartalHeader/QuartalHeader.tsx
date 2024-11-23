import { IQuartalHeaderProps } from "./IQuartalHeaderProps";
import { Button, tokens, makeStyles } from "@fluentui/react-components";
import { ArrowLeftRegular, ArrowRightRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: `${tokens.spacingHorizontalL} ${tokens.spacingVerticalXXXL}`,
  },
});

const QuartalHeader: React.FC<IQuartalHeaderProps> = (
  props: IQuartalHeaderProps
) => {
  const classes = useStyles();
  const { quarter, year, nextQuarter, previousQuarter } = props;

  return (
    <div className={classes.container}>
      <Button icon={<ArrowLeftRegular />} onClick={previousQuarter}></Button>
      <h3 className={classes.title}>
        Quartal {quarter}, {year}
      </h3>
      <Button icon={<ArrowRightRegular />} onClick={nextQuarter}></Button>
    </div>
  );
};

export default QuartalHeader;
