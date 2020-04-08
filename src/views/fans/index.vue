<template>
<!--    数据可视化  echarts-->
<!-- created 是创建vue实例之后才执行 ， 这时页面并没有完成渲染 -->
<!-- mounted 是页面渲染完成之后才执行-->
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">图文数据</template>
    </bread-crumb>
    <div ref="myECharts1" style="width:100%;height:600px"></div>
    <div ref="myECharts2"  style="width:100%;height:600px"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    var myChart1 = echarts.init(this.$refs.myECharts1) // 参数位置 放元素(容器)
    var myChart2 = echarts.init(this.$refs.myECharts2)

    myChart1.setOption({
      title: {
        text: 'BUKA309月薪40k雷达图'
      },
      tooltip: {},
      legend: {
        data: [
          '工资分配', '实际开销'
        ]
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: '销售', max: 6500 },
          { name: '管理', max: 16000 },
          { name: '信息技术', max: 30000 },
          { name: '客服', max: 38000 },
          { name: '测试', max: 52000 },
          { name: '研发', max: 25000 }
        ]
      },
      series: [{
        name: ' 预算 vs 开销',
        type: 'radar',
        data: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: '预算分配'
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: '实际开销'
          }
        ]
      }]
    })

    myChart2.setOption({
      tooltip: {
        trgger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直达', '营销广告', '搜索引擎', '邮件营销', '视频广告', '百度', '谷歌', '必应', '其他']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            normal: {
              position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 335, name: '直达', selected: true
            },
            {
              value: 678, name: '营销广告'
            },
            {
              value: 1534, name: '搜索引擎'
            }
          ]
        },
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '55%'],
          label: {
            normal: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            }
          },
          data: [
            { value: 335, name: '直达' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1048, name: '百度' },
            { value: 251, name: '谷歌' },
            { value: 147, name: '必应' },
            { value: 102, name: '其他' }
          ]
        }
      ]
    })
  }
}
</script>

<style scoped>

</style>
