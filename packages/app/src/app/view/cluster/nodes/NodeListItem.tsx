import {
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Link} from "app/view/share";
import type {Node} from "app/view/cluster/types";
import {StatusSign, toLabel} from "app/view/share";

const {node: nodeMark} = testMarks.cluster.nodes.list;

export const NodeListItem = ({node}: {node: Node}) => {
  return (
    <DataListItem aria-labelledby={node.name} id={node.name}>
      <DataListItemRow {...nodeMark.mark}>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell>
                <Link strong to={`/${node.name}`} {...nodeMark.name.mark}>
                  {node.name}
                </Link>
              </DataListCell>
              <DataListCell>
                <StatusSign
                  status={
                    node.status === "DATA_NOT_PROVIDED"
                      ? "WARNING"
                      : node.statusSeverity
                  }
                  label={
                    <strong {...nodeMark.status.mark}>
                      {toLabel(node.status)}
                    </strong>
                  }
                  showOkIco
                />
              </DataListCell>
              <DataListCell>
                <StatusSign
                  status={
                    node.status === "DATA_NOT_PROVIDED"
                      ? "WARNING"
                      : node.quorumSeverity
                  }
                  label={
                    <strong {...nodeMark.quorum.mark}>
                      {node.status === "DATA_NOT_PROVIDED" &&
                        "Unknown quorum status"}
                      {node.status !== "DATA_NOT_PROVIDED" &&
                        (node.quorum ? "Has quorum" : "Does not have quorum")}
                    </strong>
                  }
                  showOkIco
                />
              </DataListCell>
            </>
          }
        />
      </DataListItemRow>
    </DataListItem>
  );
};
