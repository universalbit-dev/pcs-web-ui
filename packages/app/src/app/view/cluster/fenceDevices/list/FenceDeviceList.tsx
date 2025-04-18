import {DataList} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import type {FenceDevice} from "app/view/cluster/types";
import {EmptyStateClusterStopped, EmptyStateNoItem} from "app/view/share";
import {
  useGroupDetailViewContext,
  useLoadedCluster,
} from "app/view/cluster/share";

import {FenceDeviceListItem} from "./FenceDeviceListItem";

const {empty, list, stopped} = testMarks.cluster.fenceDevices;

export const FenceDeviceList = ({
  fenceDeviceList,
}: {
  fenceDeviceList: FenceDevice[];
}) => {
  const {compact, selectedItemUrlName} = useGroupDetailViewContext();
  const {hasCibInfo, clusterName} = useLoadedCluster();

  if (!hasCibInfo) {
    return (
      <EmptyStateClusterStopped
        title={"Cannot get fence devices from stopped cluster"}
        clusterName={clusterName}
        {...stopped.mark}
      />
    );
  }
  if (fenceDeviceList.length === 0) {
    return (
      <EmptyStateNoItem
        title="No fence device is configured."
        message="You don't have any configured fence device here."
        {...empty.mark}
      />
    );
  }
  return (
    <DataList
      aria-label="Cluster fence devices"
      className={`ha-c-tree-view${compact ? "" : " ha-m-full-width"}`}
      selectedDataListItemId={selectedItemUrlName}
      {...list.mark}
    >
      {fenceDeviceList.map(fenceDevice => (
        <FenceDeviceListItem key={fenceDevice.id} fenceDevice={fenceDevice} />
      ))}
    </DataList>
  );
};
