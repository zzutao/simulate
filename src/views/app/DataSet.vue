<template>
  <div>
    <!-- 标签页 -->
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="MD17数据集" name="md17">
        <dataset-table
          :table-data="md17Data"
          :description="md17Description"
          title="MD17数据集"
        />
      </el-tab-pane>
      <el-tab-pane label="MD22数据集" name="md22">
        <dataset-table
          :table-data="md22Data"
          :description="md22Description"
          title="MD22数据集"
        />
      </el-tab-pane>
      <el-tab-pane label="ISO17数据集" name="iso17">
        <dataset-download
          title="ISO17数据集"
          :description="ISO17"
          download-url="http://quantum-machine.org/datasets/iso17.tar.gz"
          download-type="direct"
        />
      </el-tab-pane>
      <el-tab-pane label="MPF数据集" name="mpf">
        <dataset-download
          title="MPF数据集"
          :description="MPF"
          download-url="https://figshare.com/articles/dataset/MPF_2021_2_8/19470599"
          download-type="link"
        />
      </el-tab-pane>
      <el-tab-pane label="MPtrj数据集" name="mpt">
        <dataset-download
          title="MPtrj数据集"
          :description="MPtrj"
          download-url="https://figshare.com/articles/dataset/Materials_Project_Trjectory_MPtrj_Dataset/23713842"
          download-type="link"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DatasetTable from './DatasetTable.vue'
import DatasetDownload from './DatasetDownload.vue'

export default {
  components: {
    DatasetTable,
    DatasetDownload
  },
  data() {
    return {
      activeTab: 'md17',
      md17Data: [
        { chineseName: '苯', englishName: 'Benzene', size: '627,983', url: 'http://www.sgdml.org/#datasets' },
        { chineseName: '尿嘧啶', englishName: 'Uracil', size: '133,770', url: 'http://www.sgdml.org/#datasets' },
        { chineseName: '萘', englishName: 'Naphthalene', size: '326,250', url: 'http://www.sgdml.org/#datasets' },
        { chineseName: '阿司匹林', englishName: 'Aspirin', size: '211,762', url: 'http://www.sgdml.org/#datasets' },
        { chineseName: '水杨酸', englishName: 'Salicylic acid', size: '320,231', url: 'http://www.sgdml.org/#datasets' },
        { chineseName: '丙醛', englishName: 'Malonaldehyde', size: '933,237', url: 'http://www.sgdml.org/#datasets' },
        { chineseName: '乙醇', englishName: 'Ethanol', size: '555,092', url: 'http://www.sgdml.org/#datasets' },
        { chineseName: '甲苯', englishName: 'Toluene', size: '442,790', url: 'http://www.sgdml.org/#datasets' }
      ],
      md22Data: [
        { chineseName: '乙酰基-丙氨酰三肽甲酯', englishName: 'Ac-Ala3-NHMe', size: '85,109', url: 'http://www.sgdml.org/#datasets' },
        { chineseName: '二十二碳六烯酸', englishName: 'Docosahexaenoic acid', size: '69,753', url: 'http://www.sgdml.org/#datasets' },
        { chineseName: '水苏糖', englishName: 'Stachyose', size: '27,272', url: 'http://www.sgdml.org/#datasets' },
        { chineseName: 'DNA碱基对（AT-AT）', englishName: 'DNA base pair (AT-AT)', size: '20,001', url: 'http://www.sgdml.org/#datasets' },
        { chineseName: 'DNA碱基对（AT-AT-CG-CG）', englishName: 'DNA base pair (AT-AT-CG-CG)', size: '10,153', url: 'http://www.sgdml.org/#datasets' },
        { chineseName: '富勒烯捕获器', englishName: 'Buckyball catcher', size: '6,102', url: 'http://www.sgdml.org/#datasets' },
        { chineseName: '双壁纳米管', englishName: 'Double-walled nanotube', size: '5,032', url: 'http://www.sgdml.org/#datasets' }
      ],
      md17Description: `该分子动力学（MD17）数据集的大小范围从150k到近1M的构象几何形状。所有轨迹都是在500 K的温度和0.5 fs的分辨率下计算的。
        分子具有不同的大小，分子PES表现出不同程度的复杂性。一组数据点内所有数据点的能量范围为20至48千卡/摩尔。力分量范围为266至570千卡/立方米。
        每个数据集的总能量和力标签是使用PBE+vdW TS电子结构方法计算的。所有几何形状均以埃为单位，能量和力分别以kcal/mol和kcal/mol/A为单位。
        数据以xyz格式提供，每个确认一个文件。每个几何图元的能量和力标签都包含在注释行中。这样，文件仍然是有效的xyz文件。位置以埃为单位，能量以kcal/mol为单位。
        详细介绍：<a href="http://quantum-machine.org/datasets/" target="_blank">http://quantum-machine.org/datasets/</a>`,
      md22Description: `该分子动力学（MD22）数据集，在系统大小（42至370个原子）、灵活性和非局域性程度方面提出了新的挑战。因此，MD22可以被视为现在成熟的MD17数据集的下一代。
      MD22包括四大类生物分子和超分子的例子，从具有42个原子的小肽，一直到具有370个原子的双壁纳米管。在400至500 K的温度范围内，以1 fs的分辨率对轨迹进行了采样，
      并在PBE+MBD理论水平上计算了相应的势能和原子力。
      详细介绍：<a href="https://www.science.org/doi/10.1126/sciadv.adf0873" target="_blank">https://www.science.org/doi/10.1126/sciadv.adf0873</a>`,
      ISO17: `这些分子是从QM9数据集中最大的一组异构体中随机抽取的，该数据集由原子组成固定的分子（C7O2H10）组成，排列在不同的化学有效结构中。它是ismoer MD数据的扩展。
      该数据库是使用Fritz Haber研究所从头计算模拟包（FHI目标）从分子动力学模拟中生成的。模拟是使用广义梯度近似（GGA）中的标准量子化学计算方法密度泛函理论（DFT）和Perdew-Burke-Ernzerhof（PBE）泛函和Tkatchenko-Scheffler（TS）范德华校正方法进行的。
      该数据库由129个分子组成，每个分子包含5000个构象几何形状、能量和力，分子动力学轨迹的分辨率为1飞秒。
      详细介绍：<a href="http://quantum-machine.org/datasets/" target="_blank">http://quantum-machine.org/datasets/</a>`,
      MPF: `该数据集包含用于训练m3gnet模型的MPF.2021.2.8数据，
      例如，<a href="https://arxiv.org/abs/2202.02450" target="_blank">https://arxiv.org/abs/2202.02450/</a>
      MPF数据集发布于2022年9月24日13:08，作者：Chi Chen, Shyue Ping Ong`,
      MPtrj: `MPtrj数据集，该json文件包含用于训练预训练CHGNet的1580395个结构、1580395种能量、7944833个磁矩、49295660个力和14223555个应力。
      结构和标签是从2022.9版本材料项目的所有GGA/GGA+U静态/弛豫轨迹中解析出来的，选择方法避免了不兼容的计算和重复的结构。
      该数据集由Deng, Bowen and Zhong, Peichen and Jun, KyuJung and Riebesell, Janosh and Han, Kevin and Bartel, Christopher J. and Ceder, Gerbrand发布。
      详细介绍：<a href="https://figshare.com/articles/dataset/Materials_Project_Trjectory_MPtrj_Dataset/23713842" target="_blank">http://quantum-machine.org/datasets/</a>`
    }
  }
}
</script>

<style scoped>
/* 可选样式 */
.el-tabs {
  margin-top: 10px;
}

.el-card {
  margin-top: 10px;
}

.description-content {
  white-space: pre-line; /* 保留换行符但合并空白 */
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.description-content a {
  color: #409EFF;
  text-decoration: none;
}
</style>
