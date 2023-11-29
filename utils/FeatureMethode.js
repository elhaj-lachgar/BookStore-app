

class FeatureMethode {

    constructor ( MongoQuery , query) {

        this.MongoQuery = MongoQuery ;
        this.page = query.page ;
        this.keyword = query.keyword ;
        this.limit = query.limit ;
        this.sort = query.sort ;
        this.fileds = query.fileds ;

    }
    filter () {
        delete this.query.sort;
        delete this.query.keyword;
        delete this.query.fields;
        delete this.query.page;
        delete this.query.limit;


        const QueryStr = JSON.stringify(this.query);
        const RegQuery = QueryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        this.query = JSON.parse(RegQuery);
        
        this.MongoQuery = this.MongoQuery.find(this.query);

        return this;
    }

    SortBy(){

        if ( this.sort){
            const sortStr = this.sortValue;
            const sort = sortStr.splite(',').join(' ');
            this.MongoQuery = this.MongoQurey.sort(sort);
            
        }
        return this;
    }

    Pagination (countDoc) {

        const page = this.page || 1 ;
        const limit = this.limit || 10 ;
        const skip  = limit * ( page - 1 ) ;
        const endPage = Math.ceil( countDoc / ( page * limit ));
        const pagination = {}

        if ( page <= ( endPage + 1 )) 
          pagination.perpage = page - 1 ;
        if ( page >= (endPage + 1) )
          pagination.nextpage = page + 1 ;

        this.MongoQuery = this.MongoQuery.skip(skip).limit(limit);

        this.pagination = pagination ;

        return this ;
        
    }

    FiledsBy() {
        let fieldsStr ;

        if ( this.fields){
            fieldsStr = this.fieldsValue.split(',').join(' ')
        }
        else{
            fieldsStr = "-createdAt"
        }
        this.MongoQuery = this.MongoQuery.select(fieldsStr);
        return this ;
    }

    SearchBy(arr) {
        if (this.keyword){

            let SearchQuery = {};

            SearchQuery.$or = arr ;

            this.MongoQuery = this.MongoQuery.find(SearchQuery);

        }

        return this ;
    }
}


module.exports = FeatureMethode ;