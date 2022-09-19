<template>
  <div class="frd-process-history" :style="boxStyle">
    <mue-datatable ref="dataCrud" :data="values" :total="total" :columns="cols" :virtual="false" row-key="id" :name="label">
    </mue-datatable>
  </div>
</template>

<script>
import {DateFormat} from "../../../../utils/lib"
import { TimeSpan } from "mue/src/lib/common"

export default {
  name: "FtmProcessHistory",
  inheritAttrs: false,
  components: {},
  /**
   * 参数
   * @param hideCols {Array} 需要隐藏的内置字段集合
   * @param dynamicCols {Array} 动态添加流程中的字段
   */
  props: [
    "field", "model", "label", "boxWidth", "boxHeight", "hideCols", "isDesign",
    "dynamicCols"
  ],
  data() {
    return {
      //内置列
      columns: [
        { title: '节点类型', field: 'nodeType', width: 100},
        { title: '节点名称', field: 'nodeName', width: 200},
        { title: '处理人员', field: 'assignee', width: 160},
        { title: '到达时间', field: 'arriveTime', width: 160},
        { title: '处理时间', field: 'operateTime', width: 160},
        { title: '时长', field: 'duration', width: 160}
      ],
      //内置数据
      values:[],
      total:-1,
    };
  },
  computed: {
    value: {
      get() {
        return this.model[this.field];
      },
      set(nv) {
        this.$set(this.model, this.field, nv);
      }
    },
    cols() {
      let resultCols = []
      resultCols = this.columns.filter(f => {
        return !(this.hideCols || []).includes(f.field)
      });

      //动态字段
      let dynamicCols = [];
      if((this.dynamicCols || []).length) {
        for(let opt of this.dynamicCols) {
          dynamicCols.push({title: opt.Name, field: opt.Value, width: 160})
        }
      }

      return [...resultCols, ...dynamicCols]
    },
    prefix() {
      return this.$OPTS.urlPrefix || ""
    },
    boxStyle() {
      let obj = {};
      let width = this.boxWidth ? this.boxWidth : "100%"
      let height = this.boxHeight ? this.boxHeight : "300px"
      obj = {
        width,
        height
      }
      return obj
    },
  },
  watch: {
    value: {
      immediate: true, handler(v) {
        if(this.isDesign) {
          return
        }
        if(v) {
          this.$nextTick(() => {
            this.getHistoryList()
          })
        }
      }
    }
  },
  methods: {
    getHistoryList(params) {
      return new Promise(resolve => {
        $.ajax({
          type: "GET",
          contentType: "application/json",
          dataType: "json",
          // data: JSON.stringify(params),
          url: `/bpm/customize-api/instance/${this.value}/history`,
          beforeSend: (xhr) => {
            if (!(Object.keys(this.FORMRENDER_HEADER).length)) {
              return
            }
            for (let [key, value] of Object.entries(this.FORMRENDER_HEADER)) {
              xhr.setRequestHeader(key, value);
            }
          },
          success: (res) => {
            let his = this.transferHistory(res || [])
            this.values = his
            this.total = his.length
            resolve({
              rows: his,
              total: his.length
            })
          },
          error: (err) => {
            this.values = []
            this.total = -1
            resolve([])
            this.$message.error(`接口出错: ${err}`);
          }
        });
      })
    },
    transferHistory(his) {
      return his.map(m => {
        //节点类型
        let nodeType = ""
        if(m.task.activityType === "startEvent") {
          nodeType = "开始"
        }
        if(m.task.activityType === "userTask") {
          nodeType = "用户处理"
        }
        if (m.task.activityType.toLowerCase().includes('endevent')) {
          nodeType = "结束"
        }
        if (m.task.activityType === "subProcess") {
          nodeType = "子流程"
        }

        //处理人
        let assignee = ""
        if(nodeType === "开始" && !m.variables.complete_nm) {
          assignee = m.variables.creator_nm
        } else {
          assignee = m.variables.complete_nm || this.getUserName(m.task.assigneeList)
        }

        //时长
        let duration = ""
        if(m.task.activityType != 'noneEndEvent' && m.task.activityType != 'startEvent') {
          duration = this.getTotalTime(m.task)
        }
        if((m.task.activityType === "userTask" || m.task.activityType === "startEvent") && !m.task.endTime ) {
          duration = ""
        }

        let dynamicFields = {}
        if((this.dynamicCols || []).length) {
          for(let opt of this.dynamicCols) {
            dynamicFields[opt.Value] = m.variables[opt.Value]
          }
        }

        return {
          nodeType,
          nodeName: m.task.activityName,
          assignee,
          arriveTime: DateFormat(m.task.startTime/1000, "yyyy-MM-dd HH:mm"),
          operateTime: DateFormat(m.task.endTime/1000, "yyyy-MM-dd HH:mm"),
          duration,
          ...dynamicFields
        }
      })
    },
    getUserName(list) {
      if(!list || !list.length) {
        return ""
      }

      let taskOperator = list.map(m => {
        return m.userName ? m.userName : m.groupName
      })
      return taskOperator.join(",")
    },
    getTotalTime(task) {
      let total = task.endTime - task.startTime
      return TimeSpan(total / 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.frd-process-history {
  width: 100%;
  height: 100%;

  ///deep/ .cue-crud {
  //    .cue-crud__header {
  //        display: none;
  //    }
  //}
}
</style>
